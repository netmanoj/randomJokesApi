const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Load jokes from files
const jokes1 = JSON.parse(fs.readFileSync('jokes1.json', 'utf8'));
const jokes2 = JSON.parse(fs.readFileSync('jokes2.json', 'utf8'));

// Combine jokes from both files
const allJokes = [...jokes1, ...jokes2];

// Route to get a random joke
app.get('/random-joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * allJokes.length);
  const joke = allJokes[randomIndex];
  res.json({ joke });
});

// Route to get all jokes
app.get('/all-jokes', (req, res) => {
  res.json(allJokes);
});

// Start the server
app.listen(port, () => {
  console.log(`Joke API running on port ${port}`);
});
