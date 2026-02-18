import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// This endpoint will get messages from Roblox
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userMessage })
    });

    const data = await response.json();
    // Hugging Face returns text in different formats sometimes
    const reply = data[0]?.generated_text || "I didn't understand that.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error 😅" });
  }
});

// Test server in browser
app.get("/", (req, res) => {
  res.send("AI server is running!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

