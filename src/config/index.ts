import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../utils/Logger';

dotenv.config();

const PORT = process.env.APP_PORT??3000
const MONGO_URI = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`
const API_VERSION=process.env.API_VERSION??'v1'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
   logger.info('DB connected');
  } catch (error) {
    logger.error('Error connecting to DB', error);
    process.exit(1);
  }
};

export default {
  PORT,
  connectDB,
  API_VERSION,
  JWT_SECRET: process.env.JWT_SECRET
};