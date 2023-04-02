/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import authRouter from './routes/AuthRoute.js';

const app = express();

const configureApp = () => {
  app.use(cors());
};

const addRouters = () => {
  app.use('/', authRouter);
};

app.get('/', (req, res) => {
  console.log('New request from HomePage.');
  res.send('<h1>Hi from srever<h1/>');
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
