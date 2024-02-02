const express = require('express');

const app = express();

const PORT = 1245;

// Define route for the endpoint '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

// Export the app variable
module.exports = app;
