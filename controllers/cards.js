const Card = require('../models/card');

const ERROR_WRONG_DATA_CODE = 400;
// const ERROR_NOT_FOUND_CODE = 404;
const ERROR_DEFAULT_CODE = 500;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then(() => {})
    .catch(() => res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
);

module.exports.dislikeCard = (req) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
);
