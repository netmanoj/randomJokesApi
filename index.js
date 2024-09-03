const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

let jokes1, jokes2;

try {
  // Load jokes from files
  jokes1 = JSON.parse(fs.readFileSync('jokes1.json', 'utf8'));
  jokes2 = JSON.parse(fs.readFileSync('jokes2.json', 'utf8'));
} catch (error) {
  console.error('Error loading jokes:', error);
  process.exit(1); // Exit if there is an issue with loading files
}

// Combine jokes from both files
const allJokes = [...jokes1, ...jokes2];

// Route to get a random joke
app.get('/random-joke', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * allJokes.length);
    const joke = allJokes[randomIndex];
    res.json({ joke });
  } catch (error) {
    console.error('Error retrieving random joke:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all jokes
app.get('/all-jokes', (req, res) => {
  try {
    res.json(allJokes);
  } catch (error) {
    console.error('Error retrieving all jokes:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Joke API running on port ${port}`);
});
