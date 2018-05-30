import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();
const app = express();
const {
  env
} = process;
const {
  PORT
} = env;

const {
  index,
  user
} = routes;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', index);
app.use('/api/v1', index);
app.use('/api/v1/auth', user)

app.use(function (req, res, next) {
  res.status(404).send({
    error: `Oops looks like that page doesn't exist`
  });
});

app.listen(PORT, error => {
  if (error) {
    return error;
  }

  return `server started on ${PORT}`;
});

export default app;