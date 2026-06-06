import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe lazy initialization of Gemini API
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ GEMINI_API_KEY is not defined. AI coach features will fallback to offline mock guidance.");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey || "MOCK_KEY",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API endpoint for AI performance coaching advice
  app.post("/api/coach", async (req, res) => {
    try {
      const { metrics, goal, currentMessage, chatHistory } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return structured, clean science-based offline response if key is missing
        return res.json({
          text: `### ⚠️ Offline Coach Mode Active
Please configure your **GEMINI_API_KEY** under Settings > Secrets to unlock live athletic biometrics mapping.

**Estimated Recommendation based on Biometrics:**
*   **VO2 Max (${metrics?.vo2Max || "54.2"}):** High aerobic power. Incorporate 1-2 sessions of zone-5 micro-intervals per week.
*   **Recovery Score (${metrics?.recoveryScore || "92"}% - OPTIMAL):** Central Nervous System is fully charged. Today is a prime window for a high-intensity, compound strength density load (squats/deadlifts) or high-intensity threshold sprint.
*   **Training Focus:** Adapt volume output linearly. Prioritize compound movement velocity tracking. Limit rest periods to 90 seconds to reinforce neuromuscular recruitment under acute cardiovascular strain.`
        });
      }

      const client = getGeminiClient();

      const statsString = `Member Current Stats:
- VO2 Max: ${metrics?.vo2Max || "54.2"}
- Recovery Status: ${metrics?.recoveryScore || "92"}% (OPTIMAL)
- Heart Rate: ${metrics?.heartRate || "68"} bpm (Resting)
- Current Target Goal: ${goal || "Strength and Neuromuscular Power"}`;

      const systemInstruction = `You are the FitForge AI Performance Coach, an elite sports scientist and biometric coach. 
You offer hyper-precise, data-driven, actionable training and nutritional advice based on the member's vitals.
Tone: Highly technical, scientific, motivating, clean, and direct. Avoid generic coaching filler or excessive generic pleasantries.
Format your response using bold Markdown formatting, subheadings, and crisp, bulleted protocols. Keep your response practical, concise and professional.`;

      const contents = [
        {
          role: "user" as const,
          parts: [{
            text: `Here are my biological metrics and training goal:
${statsString}

My query/focus is: ${currentMessage || "Suggest a daily layout of workout parameters."}

If I have asked questions before, please synthesize. Provide structured guidance on training intensities, cardiac targets, and localized nutrition.`
          }]
        }
      ];

      // Call model using the correct gemini-3.5-flash model
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.75,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Coaching generation failed:", error);
      res.status(500).json({ error: "Bio-analytics calculation failed", details: error.message });
    }
  });

  // Hot HMR settings & serving routing using Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 FitForge running on http://localhost:${PORT} in env: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
