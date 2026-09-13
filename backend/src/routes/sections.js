import { Router } from "express";
import Section from "../models/Section.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const sections = await Section.find({}, { key: 1, updatedAt: 1 });
  res.json(sections);
});

router.get("/:key", async (req, res) => {
  const section = await Section.findOne({ key: req.params.key });
  if (!section) return res.status(404).json({ error: "Section not found" });
  res.json(section);
});

router.put("/:key", requireAuth, async (req, res) => {
  const { data } = req.body || {};
  if (data === undefined) return res.status(400).json({ error: "data is required" });

  const section = await Section.findOneAndUpdate(
    { key: req.params.key },
    { key: req.params.key, data },
    { upsert: true, new: true }
  );
  section.markModified("data");
  await section.save();
  res.json(section);
});

export default router;
