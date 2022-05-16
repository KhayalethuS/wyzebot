import express from 'express';
import { ConnectectionCheck, ListCharaters, CreateCharater, UpdateCharater } from './db_conn';
import Joi from 'joi';
import morgan from 'morgan';

const app = express();
const port = 3000;

db();

app.use(morgan('tiny'));
app.use(express.json());

// App routes
app.get('/list-characters', async (req, res) => {
  const response = await ListCharaters();

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
});

app.post('/characters', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    powers: Joi.array().unique().min(1).max(3).items().required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error));
  }

  const response = await CreateCharater(value);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
});

app.put('/characters', async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    powers: Joi.array().unique().min(1).max(3).items().required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error));
  }

  const response = await UpdateCharater(value);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
});

async function db () {
  const dbConnection = await ConnectectionCheck();
  
  if (dbConnection) {
    console.log('Database Connection was established and closed!');
  }
} 

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});