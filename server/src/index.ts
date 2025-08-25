import express, { Request, Response } from 'express';
import authRoutes from '../src/routes/auth.route.js';
import messageRoutes from '../src/routes/message.route.js';
import { connectDB } from './lib/db.js';
import path from 'path';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { app, server } from './lib/socket.io.js';
import { NODE_ENV, PORT } from 'constants/env-vars.js';

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*any}', (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.get('/', (_: Request, res: Response) => {
  res.send('Hello from Server');
});
server.listen(PORT, () => {
  console.log(`Hello Server is Running ${PORT}`);
  connectDB();
});
