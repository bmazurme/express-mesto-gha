const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('переданы некорректные данные в метод');
      }
      next(err);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('access denied');
      }

      Card.findByIdAndDelete(req.params.id)
        .then((crd) => {
          if (!crd) {
            throw new NotFoundError('карточка не найдена');
          }
          return res.status(200).send(crd);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('переданы некорректные данные в метод');
          }
          next(err);
        })
        .catch(next);

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('переданы некорректные данные в метод');
      }
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((data) => {
    console.log(data);
    if (!data) {
      throw new NotFoundError('карточка не найдена');
    }
    return res.status(200).send({ data });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('переданы некорректные данные в метод');
    }
    next(err);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      throw new NotFoundError('карточка не найдена');
    }
    return res.status(200).send({ data });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('переданы некорректные данные в метод');
    }
    next(err);
  })
  .catch(next);
