import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: userMessage
      })
    });

    const data = await response.json();
    const reply = data.output_text || "I didn't understand that.";

    res.json({ reply });
  } catch (err) {
    res.json({ reply: "Server error 😅" });
  }
});

app.get("/", (req, res) => {
  res.send("AI server is running!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
