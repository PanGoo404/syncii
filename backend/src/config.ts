import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
dotenv.config();

export const PORT = process.env?.PORT || 8080;

const CLUSTER = process.env?.CLUSTER || 'mongodb://127.0.0.1:27017';

const DB_NAME = process.env?.DB_NAME || 'workout';

export const MONGO = `${CLUSTER}/${DB_NAME}`;

export const JWT_SEC = process.env?.JWT_SEC || randomBytes(32).toString('hex');
