const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// app.use('/users', require('./routes/users'));
app.use((req, res, next) => {
  req.user = {
    _id: '6268496fe215d02525baacfa',
  };

  next();
});
app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
