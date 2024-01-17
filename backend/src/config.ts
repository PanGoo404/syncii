import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;

const CLUSTER = process.env.CLUSTER || 'mongodb://127.0.0.1:27017';

const DATABASE = process.env.DATABASE || 'workout';

export const MONGO = `${CLUSTER}/${DATABASE}`;
