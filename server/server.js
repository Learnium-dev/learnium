import express from "express";
import router from "./routes/router.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

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
