import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from 'constants/env-vars.js';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

export const protectAuthRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, No token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded) {
      return res
        .status(401)
        .json({ message: 'Unauthorized, No Token, Verified' });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('Error At Authentication', error);
    res.status(501).json({ message: 'Internal Server Error' });
  }
};
