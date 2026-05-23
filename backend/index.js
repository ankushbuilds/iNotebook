const connectToMongoDB = require('./db');
connectToMongoDB();


const express = require('express')
const app = express()
const port = 5000

app.use(express.json()); // Middleware to parse JSON bodies in incoming requests

// Available Routes => separate route files for different routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});


