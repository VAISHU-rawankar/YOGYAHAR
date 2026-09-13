import mongoose from "mongoose";
import dns from "dns";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");

  // Fallback to public DNS servers if the local DNS resolver blocks/fails SRV lookup
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {
    console.warn("Unable to set custom DNS servers", e);
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

