const express = require('express');
const pool = require('./db');
const cors = require('cors');
const todoRouter = require('./routers/todoRouter');
const userRouter = require('./routers/userRouter');

async function main() {
  const app = express();

  await pool
    .query(
      `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`
    )
    .then(() => console.log('created table users successfully'))
    .catch((err) => {
      console.error('Database Error occurred at:', process.env.PG_HOST);
      console.error(err);
    });

  await pool
    .query(
      `
  CREATE TABLE IF NOT EXISTS todos (
    todo_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  )
`
    )
    .then(() => console.log('created table todos successfully'))
    .catch((err) => {
      console.error('Database Error occurred at:', process.env.PG_HOST);
      console.error(err);
    });

  app.use(
    cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] })
  );
  app.use(express.json());

  app.use('/api/todo', todoRouter);
  app.use('/api/user', userRouter);

  app.get('/', (_req, res) => {
    res.send('index');
  });

  app.get('/api', (_req, res) => {
    res.send('api');
  });

  app.listen(3001, () => {
    console.log('server has started on port 3001');
  });
}

main().catch((err) => console.error(err));
