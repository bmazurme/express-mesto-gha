const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  validateLoginData,
  validateRegistrData,
} = require('./utils/validator');

const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const ERROR_NOT_FOUND_CODE = 404;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.post(
  '/signin',
  validateLoginData,
  login,
);
app.post(
  '/signup',
  validateRegistrData,
  createUser,
);

app.use('/', auth, users);
app.use('/', auth, cards);

app.use(errors());
app.use((req, res) => {
  res.status(ERROR_NOT_FOUND_CODE).json({ message: 'страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
