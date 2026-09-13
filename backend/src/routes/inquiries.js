import { Router } from "express";
import Inquiry from "../models/Inquiry.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, middleName, lastName, productName, email, phone, city } = req.body || {};
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "firstName, lastName and phone are required" });
  }

  const inquiry = await Inquiry.create({ firstName, middleName, lastName, productName, email, phone, city });
  res.status(201).json(inquiry);
});

router.get("/", requireAuth, async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});

export default router;
