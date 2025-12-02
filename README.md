AI Model Inventory Manager – Server

Express.js + MongoDB + Firebase Admin based backend for the AI Model Inventory Manager project.
This server handles authentication verification, CRUD operations, search, and model purchase tracking.

🚀 Live Server URL

👉 https://ai-models-server.vercel.app/

📦 Project Overview

This backend provides a secure and scalable API service for managing AI Models.
It supports:

Firebase token verification

Model CRUD

Purchase handling

Protected routes

Latest 6 models endpoint

Name-based search

The server is deployed on Vercel.

🛠️ Technologies Used

Node.js

Express.js

MongoDB (Atlas)

Firebase Admin

dotenv

CORS

📁 Folder Structure
ai-model-inventory-manager-server/
│── node_modules/
│── .env
│── .gitignore
│── index.js
│── package.json
│── vercel.json
│── servicekey.json

🔐 Environment Variables

Create a .env file:

DB_USERNAME=yourMongoUser
DB_PASSWORD=yourMongoPassword

Firebase Admin key must be inside servicekey.json file.

🚀 How to Run Locally
1️⃣ Install dependencies
npm install

2️⃣ Add environment variables

Create .env file as shown above.

3️⃣ Start server
npm start

Server runs on:

http://localhost:3000

🔧 API Endpoints
Root

GET /
✔ Returns basic server status

📌 Models API
Get All Models
GET /models

Get Single Model
GET /models/:id

Add New Model
POST /models
Body: { name, framework, description, ... }

Update Model
PUT /models/:id
Body: { updated fields }

Delete Model
DELETE /models/:id

⭐ Latest 6 Models

Returns newest 6 models (sorted by createdAt)

GET /latest-models

🔍 Search Models

Case-insensitive search by model name.

GET /search?search=text

🔐 Protected Routes

Firebase Token Required
Format:

Authorization: Bearer <token>

Get My Added Models
GET /my-models?email=user@gmail.com

Get My Purchases
GET /my-purchase?email=user@gmail.com

🛒 Purchase System
Add a purchase
POST /purchase/:id
Body: { purchased_by, model_id, model_name, ... }

This also:

✔ Inserts purchase data into purchase collection
✔ Increments the model’s "purchased" count by 1 using $inc

🧰 Middleware
verifyToken

Validates Firebase token using:

admin.auth().verifyIdToken(token)

Used for protected routes.

🌐 Vercel Configuration

vercel.json (already included):

{
"version": 2,
"builds": [{ "src": "index.js", "use": "@vercel/node" }],
"routes": [{ "src": "/(.*)", "dest": "index.js" }]
}

🧪 Features Covered for Assignment

✔ Firebase token verification

✔ CRUD API with MongoDB

✔ Latest models endpoint

✔ Search endpoint

✔ My Models + My Purchase (protected)

✔ Purchase + automatic count increment

✔ Environment variables

✔ Vercel deployment

✔ Clean folder structure

✔ 8+ server commits
