const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
const auth = require('./routes/authRoutes');
const task = require('./routes/taskRoutes');


=======
const routes = require('./routes/auth');
const taskRoutes = require("./routes/taskRoutes");
>>>>>>> origin/testMain
dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB();



<<<<<<< HEAD
app.use("/api", auth);
app.use("/api/task",task);


=======
app.use("/api", routes);
app.use("/api", taskRoutes);
>>>>>>> origin/testMain

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
