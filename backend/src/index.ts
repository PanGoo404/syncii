import express from 'express';
import { PORT, MONGO } from './config.js';
import mongoose from 'mongoose';

await mongoose.connect(MONGO).then(() => {
  const { host, port, name } = mongoose.connection;
  console.info(`MongoDB connected at ${host}:${port}/${name}`);
});

const app = express();

app.use('/', (req, res) => {
  res.status(200).json({ message: 'ACK' });
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.info(`Server running at ${address}:${port}`);
});
