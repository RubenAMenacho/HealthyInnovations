//server.js 

const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            res.json({ message: data.choices[0].message.content });
          } else {
            throw new Error("Invalid response structure from OpenAI API.");
          }
          
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Failed to get response from AI." });
    }
});

app.listen(PORT, () => console.log('Your server is running on PORT'+ PORT))
