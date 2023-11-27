const express = require("express");
const router = require("./routes/router.js");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
// EVR .
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const authJwt = require("./helpers/jwt.js");
require("dotenv/config");

const api = process.env.API_URL;

// Enabling CORS
app.use(cors());
app.options("*", cors());

// Calling Routers
const quizzesRouter = require("./routes/quizzes");
const usersRouter = require("./routes/users");
// const summariesRouter = require('./routes/summaries');
// const materialsRouter = require('./routes/materials');
const keytopicsRouter = require("./routes/keytopics");
const foldersRouter = require("./routes/folders");
const flashcardsRouter = require("./routes/flashcards");
const detailsRouter = require("./routes/details");
const historyquizzesRouter = require("./routes/historyquizzes.js");
const historydetailsRouter = require("./routes/historydetails.js");

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());

// Calling APIs
// Quiz
app.use(`${api}/quizzes`, quizzesRouter);
// User
app.use(`${api}/users`, usersRouter);
// Summary
// app.use(`${api}/summaries`,summariesRouter)
// Material
// app.use(`${api}/materials`,materialsRouter)
// Keytopic
app.use(`${api}/keytopics`, keytopicsRouter);
// Folder
app.use(`${api}/folders`, foldersRouter);
// Flashcard
app.use(`${api}/flashcards`, flashcardsRouter);
// Detail
app.use(`${api}/details`, detailsRouter);
// History
app.use(`${api}/historyquizzes`, historyquizzesRouter);
// History Detail
app.use(`${api}/historydetails`, historydetailsRouter);

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connection is ready");
  })
  .catch((error) => {
    console.log(error);
  });
// EVR ..

dotenv.config();
//const app = express();

// Allow requests from http://localhost:3000
const corsOptions = {
  // TODO: CORS policy should be more restrictive in production
  origin: "*",
};

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
