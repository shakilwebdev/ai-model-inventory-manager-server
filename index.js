const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const admin = require("firebase-admin");
const serviceAccount = require("./servicekey.json");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// usersName=aiModel-db
// password=r98SgGNO8cz5QgWm

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri =
  "mongodb+srv://aiModel-db:r98SgGNO8cz5QgWm@cluster0.s1ftcag.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  // console.log(req.headers.authorization);
  // console.log("i am from middleware");
  /*   if (req.headers.authorization === "hello") {
    next();
    } else {
      res.send("unauthorized access...");
  } */

  const authorization = req.headers.authorization;
  // const token = authorization.split(" ");

  if (!authorization) {
    return res.status(401).send({
      message: "unauthorized access. Token not found",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    /*  const decode = await admin.auth().verifyIdToken(token);
    console.log(decode);
     */
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).send({
      message: "unauthorized access",
    });
  }

  // console.log(token);
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("aiModel-db");
    const modelCollection = db.collection("models");

    // find
    // findOne
    app.get("/models", async (req, res) => {
      const result = await modelCollection.find().toArray();
      // console.log(result);
      res.send(result);
    });

    // post method
    // insertOne
    // insertMany
    app.post("/models", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await modelCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
      /*       res.send({
        message: "Data received successfully",
      }); */
    });

    app.get("/models/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      // console.log(id);
      const objectId = new ObjectId(id);
      const result = await modelCollection.findOne({ _id: objectId });
      // const result = await modelCollection.findOne({ _id: new ObjectId(id) });
      res.send({
        success: true,
        result,
      });
    });

    // PUT
    // updateOne
    // updateMany
    app.put("/models/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      // console.log(id);
      // console.log(data);

      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await modelCollection.updateOne(filter, update);
      res.send({
        success: true,
        result,
      });
    });

    // delete
    // deleteOne
    // deleteMany
    app.delete("/models/:id", async (req, res) => {
      const { id } = req.params;

      /*       const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const result = await modelCollection.deleteOne(filter);
 */
      const result = await modelCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({
        success: true,
        result,
      });
    });

    // latest 6 data
    // get
    // find
    app.get("/latest-models", async (req, res) => {
      const result = await modelCollection
        .find()
        // .sort({ createdAt: "asc" })
        // .sort({ createdAt: -1 })
        .sort({ createdAt: "desc" })
        .limit(6)
        .toArray();

      console.log(result);

      res.send(result);
    });

    app.get("/my-models", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await modelCollection.find({ createdBy: email }).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
