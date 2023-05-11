/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoute.js";

const app = express();
// const connectDB = require("./config/connectDB.js");

const configureApp = () => {
  app.use(cors());
};

const addRouters = () => {
  app.use("/", authRouter);
};

app.get("/", (req, res) => {
  console.log("New request from HomePage.");
  res.json({ message: "Hi from srever" });
});

const startServer = async () => {
  configureApp();
  addRouters();
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
  });
};

await startServer();

//// mongodb+srv://shmuel1234:<password>@goalfeed.xiwf2yr.mongodb.net/?retryWrites=true&w=majority
