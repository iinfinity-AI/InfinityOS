const express = require('express');
const mongoose = require('mongoose');



require('dotenv').config();



const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
