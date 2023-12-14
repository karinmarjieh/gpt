const express = require("express");
const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
    res.status(500).send(500);
  }
});

module.exports = router;
