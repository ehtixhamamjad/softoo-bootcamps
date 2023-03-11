require("dotenv").config({
  path: "./config/config.env",
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const connectDatabase = require("./utils/DBConnect");

const userRouter = require("./routers/userRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);

connectDatabase();

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
