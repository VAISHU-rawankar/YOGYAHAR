import { Router } from "express";
import NewsletterSubscriber from "../models/NewsletterSubscriber.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "email is required" });

  try {
    const subscriber = await NewsletterSubscriber.create({ email });
    res.status(201).json(subscriber);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ email, alreadySubscribed: true });
    }
    throw err;
  }
});

router.get("/", requireAuth, async (req, res) => {
  const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
});

export default router;
