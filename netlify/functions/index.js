const fs = require('fs');

const jokes1 = JSON.parse(fs.readFileSync('jokes1.json', 'utf8'));
const jokes2 = JSON.parse(fs.readFileSync('jokes2.json', 'utf8'));
const allJokes = [...jokes1, ...jokes2];

exports.handler = async (event, context) => {
  try {
    if (event.path === '/random-joke') {
      const randomIndex = Math.floor(Math.random() * allJokes.length);
      const joke = allJokes[randomIndex];
      return {
        statusCode: 200,
        body: JSON.stringify({ joke }),
      };
    } else if (event.path === '/all-jokes') {
      return {
        statusCode: 200,
        body: JSON.stringify(allJokes),
      };
    } else {
      return {
        statusCode: 404,
        body: 'Not Found',
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
