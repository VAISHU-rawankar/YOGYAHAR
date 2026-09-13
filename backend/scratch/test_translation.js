import "dotenv/config";
import { connectDB } from "../src/db.js";
import Section from "../src/models/Section.js";
import mongoose from "mongoose";

// Mock translateObject logic
const translationDictionary = {
  hi: {
    "6 Days Plan": "6 दिन का प्लान",
    "25 Days Plan": "25 दिन का प्लान"
  },
  mr: {
    "6 Days Plan": "6 दिवसांचा प्लॅन",
    "25 Days Plan": "25 दिवसांचा प्लॅन"
  }
};

function t(text, language) {
  if (!text || typeof text !== "string") return text;
  const normalized = text.trim().replace(/\s+/g, " ");
  if (language === "en") return text;
  const dictionary = translationDictionary[language];
  if (dictionary) {
    const trimmed = text.trim();
    if (dictionary[trimmed] !== undefined) {
      return dictionary[trimmed];
    }
    for (const [key, value] of Object.entries(dictionary)) {
      if (key.trim().replace(/\s+/g, " ") === normalized) {
        return value;
      }
    }
  }
  return text;
}

function translateObject(obj, language) {
  if (!obj || language === "en") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => translateObject(item, language));
  }
  if (typeof obj === "object") {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === "string") {
        result[key] = t(val, language);
      } else if (typeof val === "object" || Array.isArray(val)) {
        result[key] = translateObject(val, language);
      } else {
        result[key] = val;
      }
    }
    return result;
  }
  return obj;
}

async function run() {
  await connectDB();
  const section = await Section.findOne({ key: "plans" });
  const data = section?.data || {};
  console.log("English name:", data.plans[1].name);
  console.log("Hindi translated:", translateObject(data, "hi").plans[1].name);
  console.log("Marathi translated:", translateObject(data, "mr").plans[1].name);
  await mongoose.disconnect();
}
run().catch(console.error);
