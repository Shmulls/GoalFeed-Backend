/* eslint-disable import/extensions */
import express from 'express';
import { checkAuth } from '../controllers/Auth_controller.js';

const authRouter = express.Router();

authRouter.get('/auth', async (req, res) => {
  const requestObjcet = req.params;
  const result = await checkAuth(requestObjcet);
  return res.status(result.status).json(result.json);
});

export default authRouter;
