import express from "express";
import Section from "../models/Section.js";

const router = express.Router();

const SYSTEM_PROMPT = `You are Yogyahar's official AI Health & Customer Assistant.
Yogyahar provides 100% natural, fresh, hygienic, chemical-free, preservative-free diet foods, fruit bowls, salads, cold-pressed juices, and subscription plans in Nashik.

YOGYAHAR KNOWLEDGE BASE:

1. BRAND & MISSION:
- Slogan: "YOGYAHAR — Follow Your Diet With Us! Fresh. Natural. Hygienic. Tasty. Authentic."
- Core Value: 100% Pure Vegetarian, zero preservatives, zero chemicals, zero artificial colors, zero added sugar. Made fresh to order daily.
- Ayurvedic Philosophy: "The main purpose of Ayurveda is to maintain the health of the healthy and cure the disease of the ill."

2. KEY HIGHLIGHTS & STATS:
- 1400+ Registered Happy Customers in Nashik.
- 100+ Salads & Juices varieties.
- 180km+ Daily Doorstep Delivery Coverage across Nashik.
- Delivery Times: Morning slot (6:00 AM - 8:00 AM) and Evening slot (6:00 PM - 8:00 PM).

GUIDELINES FOR ANSWERS:
- Be warm, helpful, health-conscious, and accurate.
- Use clean bullet points with standard bullet symbols (•) when listing items, subscription plans, or health benefits.
- Do NOT use raw markdown tags like * **...** or ## headers. Use clean, plain readable text.
- If asked about prices or custom meal plans, invite the user to connect on WhatsApp or click "Connect Now!".
- Keep answers concise and readable.`;

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    let liveDataString = "";
    try {
      const sections = await Section.find({});
      const sectionMap = {};
      sections.forEach((s) => {
        sectionMap[s.key] = s.data;
      });

      const footer = sectionMap["footer"] || {};
      const whatsappNumber = footer.whatsappNumber || "7499643234";
      const hours = footer.hours || "6–8 AM & 6–8 PM daily";
      const address = footer.address || "Nashik, Maharashtra, India";

      const statsBar = sectionMap["statsBar"] || {};
      const stats = statsBar.stats || [];
      const statsString = stats.map((s) => `${s.number} ${s.label}`).join(", ");

      const productsData = sectionMap["products"] || {};
      const juices = (productsData.juices || [])
        .map(
          (j) =>
            `• ${j.name} (${j.tag || "Regular"}): ${j.availability}, Ingredients: ${
              j.ingredients || "N/A"
            }, Benefits: ${j.benefits || "N/A"}`
        )
        .join("\n");
      const detoxWater = (productsData.detoxWater || [])
        .map((j) => `• ${j.name} (${j.tag || "Regular"}): ${j.availability}, Ingredients: ${j.ingredients || "N/A"}`)
        .join("\n");
      const salads = (productsData.salads || [])
        .map(
          (j) =>
            `• ${j.name} (${j.tag || "Regular"}): ${j.availability}, Ingredients: ${
              j.ingredients || "N/A"
            }, Benefits: ${j.benefits || "N/A"}`
        )
        .join("\n");
      const nonSubItems = (productsData.nonSubItems || [])
        .map((j) => `• ${j.name}: ${j.desc || j.ingredients || ""}`)
        .join("\n");

      const plansData = sectionMap["plans"] || {};
      const plans = (plansData.plans || [])
        .map((p) => `• ${p.name} (${p.tag || "Regular"}): ${p.sub}. Features: ${(p.features || []).join(", ")}`)
        .join("\n");

      liveDataString = `
CURRENT LIVE WEBSITE DATA (Use this for the most accurate and up-to-date details):
- WhatsApp / Phone Contact: +91 ${whatsappNumber}
- Daily Service / Operating Hours: ${hours}
- Location / Address: ${address}
- Key Statistics: ${statsString || "1400+ Happy Customers, 100+ Salads & Juices, 180+ Km of Daily Doorstep Delivery"}

PRODUCTS IN CATALOG:
${juices ? `\nJuices:\n${juices}` : ""}
${detoxWater ? `\nDetox Water:\n${detoxWater}` : ""}
${salads ? `\nSalads:\n${salads}` : ""}
${nonSubItems ? `\nAdditional Products (Laddus & Wood-Pressed Oils):\n${nonSubItems}` : ""}

SUBSCRIPTION PLANS:
${plans}
`;
    } catch (dbErr) {
      console.warn("Failed to fetch live sections for chatbot context:", dbErr);
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("GROQ_API_KEY is not set in the environment");
      return res.status(500).json({ error: "AI chat is not configured" });
    }

    // Clean & limit history to recent 8 messages
    const sanitizedMessages = messages.slice(-8).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: String(m.content || "")
    }));

    // NOTE: Groq retired the llama-3.x models this app originally used.
    // These are the currently active text models on the account's Groq key
    // (verified via GET https://api.groq.com/openai/v1/models).
    const modelsToTry = ["openai/gpt-oss-20b", "openai/gpt-oss-120b"];
    let aiReply = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const payload = {
          model: modelName,
          messages: [
            { role: "system", content: `${SYSTEM_PROMPT}\n\n${liveDataString}` },
            ...sanitizedMessages
          ],
          temperature: 0.7,
          max_tokens: 500,
          reasoning_effort: "low"
        };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          aiReply = data.choices?.[0]?.message?.content;
          if (aiReply) break;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Groq model ${modelName} returned ${response.status}:`, errData);
          lastError = errData.error?.message || `Status ${response.status}`;
        }
      } catch (e) {
        console.warn(`Error trying Groq model ${modelName}:`, e.message);
        lastError = e.message;
      }
    }

    if (!aiReply) {
      console.error("All Groq models failed. Last error:", lastError);
      return res.status(500).json({
        error: lastError || "Failed to fetch response from AI model"
      });
    }

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Chat route exception:", error);
    res.status(500).json({ error: "Internal server error in chatbot route" });
  }
});

export default router;
