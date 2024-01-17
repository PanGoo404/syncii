import express from 'express';
import { PORT, MONGO } from './config.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { error404, error500 } from './middleware/errorParser.js';

await mongoose.connect(MONGO).then(() => {
  const { host, port, name: db } = mongoose.connection;
  console.info(`MongoDB connected at ${host}:${port}/${db}`);
});

const app = express();
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for insomia
app.use(cookieParser());

app.use('/', (req, res) => {
  res.status(200).json({ message: 'ACK' });
});

app.use(error404);
app.use(error500);

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Server running at ${address}:${port}`);
});
