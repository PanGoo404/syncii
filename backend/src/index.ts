import express from 'express';
import { PORT, MONGO } from './config.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/apiRoute.js';
import { errorServer, error404 } from './middleware/errorParser.js';

await mongoose.connect(MONGO).then(() => {
  const { host, port, name } = mongoose.connection;
  console.info(`MongoDB connected at ${host}:${port}/${name}`);
});

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for Insomnia
app.use(cookieParser());

app.use('/api', apiRouter); // http://localhost:8080/api...

app.use(error404);
app.use(errorServer);

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.info(`Server running at ${address}:${port}`);
});
