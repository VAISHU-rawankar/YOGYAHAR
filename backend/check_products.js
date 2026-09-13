import "dotenv/config";
import { connectDB } from "./src/db.js";
import Section from "./src/models/Section.js";
import mongoose from "mongoose";

async function run() {
  await connectDB();
  const section = await Section.findOne({ key: "blogs" });
  if (section && section.data) {
    const posts = section.data.posts || [];
    posts.forEach(p => {
      console.log(`Post: ${p.title}, Image: "${p.image}"`);
    });
  } else {
    console.log("No blogs section found in DB");
  }
  await mongoose.disconnect();
}
run().catch(console.error);
