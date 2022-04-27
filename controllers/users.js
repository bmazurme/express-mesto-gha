const User = require('../models/user');
const {
  ERROR_DEFAULT_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_WRONG_DATA_CODE,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => {
      if (!data) {
        return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'пользователь не найден' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
    },
  )
    .then((data) => {
      if (!data) {
        return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'пользователь не найден' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};
