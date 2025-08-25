import dotenv from 'dotenv';
dotenv.config();

// mongodb
export const MONGODB_URI = String(process.env.MONGODB_URI);

// cloudinary
export const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY);
export const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET);
export const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME);

// jwt
export const JWT_SECRET = String(process.env.JWT_SECRET);

// server
export const NODE_ENV = String(process.env.NODE_ENV);
export const PORT = Number(process.env.PORT || 5000);
