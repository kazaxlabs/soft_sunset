import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are an Elite Technical AI Assistant (Conseiller Technique IA), an expert in concrete preparation and resinous floor coatings in Repentigny, Laval, and Greater Montreal.
Your personality is highly professional, technical, scientific, precise, and premium.
You must answer user questions about:
1. Heated Floors (Planchers chauffants / radiants): Perfectly compatible. The heating must be turned off 48 hours before installation and remain off 48 hours after completion to ensure ideal curing temperature.
2. Maintenance (Entretien): Extremely easy. Use a damp microfiber mop with warm water and neutral pH mild soap. Avoid abrasive or acidic products. 100% stain resistant to oils/gasoline.
3. Finishes & Prices:
   - Fini Métallique ($10.50 / pi² or sqft): Mirror depth, luxurious. Great for lofts, living rooms, basements. Colors: Midnight Chrome, Oceanic Blue, Copper Lava, Emerald Shimmer.
   - Fini Flocons ($7.00 / pi² or sqft): Textured, slip-resistant, camouflaging, ideal for garages, laundry rooms, workshops. Colors: Tuxedo, Granite, Blue Diamond.
   - Fini Quartz ($12.50 / pi² or sqft): Ultra-robust, granulated aggregate, commercial grade, waterproof, ideal for showers, stairs, commercial kitchens. Colors: Sandstone, Copper Canyon.
4. Preparation: We strictly use mechanical diamond grinding (CSP-3 specification) to open concrete pores for absolute adhesion. Acid wash is strictly prohibited because it ruins durability and leaves chemical residues.
5. VOC/COV: Zero or extremely low VOC coatings respecting strict Canadian regulations to preserve indoor air quality.
6. Warranty: 20-Year residential warranty covering peeling, UV yellowing, and hot tire pick-up.

Always respond in the exact language of the user's prompt (French if they ask in French, English if in English). Keep your responses concise, highly professional, precise, and free of sales pitch clichés or emoji overload. Include actual measurements or technical details (like CSP-3, 100% solids, polyaspartic) to emphasize our scientific precision.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Technical Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request. 'messages' array is required." });
        return;
      }

      // Format messages into Content format expected by GoogleGenAI SDK
      // [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      res.json({ content: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ 
        error: "Failed to communicate with AI Consultant", 
        message: err.message || "Unknown error" 
      });
    }
  });

  // Health and Environment diagnostics
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      time: new Date().toISOString(),
      service: "Resinous Coatings Core Engine v1.0.0"
    });
  });

  // Serve Vite Frontend
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
    console.log(`[Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Server:", err);
});
