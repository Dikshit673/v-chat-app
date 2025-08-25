import mongoose from 'mongoose';
import { MONGODB_URI } from 'constants/env-vars.js';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.info('succesfully connected', connection.connection.host);
  } catch (error) {
    console.error('UnSuccefully connected got error', error);
  }
};
