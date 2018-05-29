import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const {
  env
} = process;
const {
  PORT
} = env;

app.get('/', (req, res) => {
  res.send('hello everyone');
});

app.listen(PORT, error => {
  if (error) {
    return error;
  }

  return `server started on ${PORT}`;
});

export default app;