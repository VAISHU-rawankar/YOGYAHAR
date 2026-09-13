import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.js";
import sectionsRoutes from "./routes/sections.js";
import inquiriesRoutes from "./routes/inquiries.js";
import newsletterRoutes from "./routes/newsletter.js";
import uploadRoutes from "./routes/upload.js";
import chatRoutes from "./routes/chat.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map(o => o.trim().replace(/\/$/, ""))
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    
    // Clean current request origin for comparison
    const cleanOrigin = origin.trim().replace(/\/$/, "");
    
    // Allow localhost/127.0.0.1 in development or if origin matches allowedOrigins
    const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin);

    if (
      isLocalhost ||
      allowedOrigins.includes(cleanOrigin) ||
      allowedOrigins.includes("*") ||
      allowedOrigins.length === 0
    ) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.get("/", (req, res) => res.json({ status: "Yogyahar API Running" }));

app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
