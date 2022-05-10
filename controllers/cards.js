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
        next(new BadRequestError('переданы некорректные данные в метод'));
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('access denied'));
      }
      return card.remove()
        .then(() => res.status(200).send({ message: 'карточка удалена' }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      next(new NotFoundError('карточка не найдена'));
    }
    return res.status(200).send({ data });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в метод'));
    }
    next(err);
  });

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
      next(new BadRequestError('переданы некорректные данные в метод'));
    }
    next(err);
  });
