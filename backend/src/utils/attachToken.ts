import jwt from 'jsonwebtoken';
import { JWT_SEC } from '../config.js';

export default (res, id) => {
  const token = jwt.sign({ id }, JWT_SEC);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    //      hh * mm * ss * ms
  });
};
