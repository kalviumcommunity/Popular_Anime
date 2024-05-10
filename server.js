const express = require('express');
const mongoose = require('mongoose');
const { connectDb, checkconnected } = require('./db');
const routes = require('./route');
const cors = require('cors')
const app = express();
connectDb();

app.use(express.json());
app.use(cors())
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', (req, res) => {
  if (checkconnected()) {
    res.send('Database connection status: Connected');
  } else {
    res.send('Database connection status: Connection failed');
  }
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 