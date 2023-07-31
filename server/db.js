import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
    console.log("conected to", db.connection.db.namespace)
  } catch (error) {
    console.log(error)
  }
}
