const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const workoutRoutes = require("./routes/workouts");

connectDb()

const PORT = process.env.PORT || 4000;

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// Listen for request
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
