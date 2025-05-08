const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const routes = require('./routes/auth');

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB();



app.use("/api", routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
