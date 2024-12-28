import express from "express";
import db from "./db/index.js";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    statusText: "Up",
    message: "Server is up and running",
  });
});

// Create new user
app.post("/users", async (req, res) => {
  try {
    const collection = await db.collection("users");
    var myobj = { name: "Company Inc", bio: "Highway 37" };
    const user = collection.insertOne(myobj);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

// Edit user
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
    }

    const collection = await db.collection("users");
    const newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
    const user = await collection.updateOne({ id }, newvalues);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
  }
});
// Edit user
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
    }

    const collection = await db.collection("users");
    const user = await collection.deleteOne({ id });

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
