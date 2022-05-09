const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
// const { reg } = require('./utils/validator');

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

app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      // avatar: Joi.string().pattern(reg),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use('/', auth, users);
app.use('/', auth, cards);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND_CODE).json({ message: 'страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
