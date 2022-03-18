const dotenv = require('dotenv');
const express = require('express');

const userRouter = require('./backend/routers/userRouter');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
