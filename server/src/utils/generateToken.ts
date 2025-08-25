import { JWT_SECRET, NODE_ENV } from 'constants/env-vars.js';
import { Response } from 'express';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  res: Response
) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '5d' });
  res.cookie('jwt', token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV !== 'development',
  });
  return token;
};
