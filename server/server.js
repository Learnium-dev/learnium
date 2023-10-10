const express = require("express");
const router = require("./routes/router.js");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");


dotenv.config();

const app = express();



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
