const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 
app.use(express.json());

app.get('/api/feedback', (req, res) => {
  const feedbacks = JSON.parse(fs.readFileSync('feedbacks.json', 'utf-8') || '[]');
  res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
  const feedbacks = JSON.parse(fs.readFileSync('feedbacks.json', 'utf-8') || '[]');
  const newFeedback = req.body;

  feedbacks.push(newFeedback);
  fs.writeFileSync('feedbacks.json', JSON.stringify(feedbacks, null, 2));

  res.status(201).json({ message: 'Feedback saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
