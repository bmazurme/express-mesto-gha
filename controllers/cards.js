const Card = require('../models/card');
const {
  ERROR_DEFAULT_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_WRONG_DATA_CODE,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'карточка не найдена' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'access denied' });
      }

      Card.findByIdAndDelete(req.params.id)
        .then((crd) => {
          if (!crd) {
            return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'карточка не найдена' });
          }
          return res.status(200).send(crd);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
          }
          return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
        });

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
      }
      return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((data) => {
    console.log(data);
    if (!data) {
      return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'карточка не найдена' });
    }
    return res.status(200).send({ data });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
    }
    console.log(err.name);
    return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      return res.status(ERROR_NOT_FOUND_CODE).send({ message: 'карточка не найдена' });
    }
    return res.status(200).send({ data });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ERROR_WRONG_DATA_CODE).send({ message: 'переданы некорректные данные в метод' });
    }
    return res.status(ERROR_DEFAULT_CODE).send({ message: 'Произошла ошибка' });
  });
