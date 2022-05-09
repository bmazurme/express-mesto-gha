const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_DEFAULT_CODE,
  ERROR_UNAUTHORIZED_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_WRONG_DATA_CODE,
} = require('../utils/constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
      // .send({ token });
    })
    .catch((err) => {
      res.status(ERROR_UNAUTHORIZED_CODE).send({ message: err.message });
    });

  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((matched) => {
  //     if (!matched) {
  //       // хеши не совпали — отклоняем промис
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }
  //     // аутентификация успешна
  //     const token = jwt.sign({ _id: 'd285e3dceed844f902650f40' },
  // 'super-strong-secret', { expiresIn: '7d' });
  //     return res.send({ token });
  //   })
  //   .catch((err) => {
  //     res
  //       .status(ERROR_UNAUTHORIZED_CODE)
  //       .send({ message: err.message });
  //   });
};

module.exports.createUser = (req, res) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
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

module.exports.getCurrentUser = (req, res) => {
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
