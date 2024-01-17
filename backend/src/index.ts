import express from 'express';
import { PORT } from './config.js';

const app = express();

app.use('/', (req, res) => {
  res.status(200).json({ message: 'ACK' });
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Server running at ${address}:${port}`);
});
