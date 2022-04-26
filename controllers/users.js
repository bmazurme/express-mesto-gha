const User = require('../models/user');

const ERROR_CODE = 400;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUsers = (req, res) => {
  User.findById(req.params.id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req) => {
  console.log(req.user._id);
  // User.find({})
  //   .then((users) => res.send(users))
  //   .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req) => {
  console.log(req.user._id);
  // User.find({})
  //   .then((users) => res.send(users))
  //   .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
