import express from 'express';
import dotenv from 'dotenv';
import db from './mongoC.js'; // Assumes `db` is already connected and exported
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.urlencoded({ extended: true })); // Built-in instead of body-parser
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/addUser', async (req, res) => {
  try {
    const collection = await db.collection('users');
    const newUser = { ...req.body, date: new Date() };
    const result = await collection.insertOne(newUser);
    console.log("New User Added:", req.body);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send({ error: "Failed to add user" });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const collection = await db.collection('users');
    const users = await collection.find({}).toArray();
    res.status(200).send(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
