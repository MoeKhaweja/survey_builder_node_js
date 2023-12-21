const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());
// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const surveyRoutes = require("./routes/survey.routes");
app.use("/admin", surveyRoutes);

const questionRoutes = require("./routes/question.routes");
app.use("/add", questionRoutes);

const answerRoutes = require("./routes/answer.routes");
app.use("/answer", answerRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);
  connectToMongoDB();
});
