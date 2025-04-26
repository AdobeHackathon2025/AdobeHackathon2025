const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/quote', async (req, res) => {
  const prompt = req.body.prompt || 'motivation';
  const response = await fetch('https://api.together.xyz/inference', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_TOGETHER_API_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3-8b",
      prompt: `Write a short motivational quote based on: "${prompt}"`,
      max_tokens: 50
    })
  });
  const data = await response.json();
  res.json({ quote: data.output.trim() });
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));

