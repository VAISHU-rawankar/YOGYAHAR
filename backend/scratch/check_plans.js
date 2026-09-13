import "dotenv/config";
import { connectDB } from "../src/db.js";
import Section from "../src/models/Section.js";
import mongoose from "mongoose";

async function run() {
  await connectDB();
  const section = await Section.findOne({ key: "plans" });
  console.log("Plans data:", JSON.stringify(section?.data, null, 2));
  await mongoose.disconnect();
}
run().catch(console.error);
