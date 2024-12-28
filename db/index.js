import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://simon123:${password}@simon.syoxf.mongodb.net/?retryWrites=true&w=majority&appName=simon`;

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error(e);
}

let db = conn.db("node-app");

export default db;
