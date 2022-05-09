const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg, validateObjectId } = require('../utils/validator');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(reg).required(),
    }),
  }),
  createCard,
);
router.get('/cards', getCards);
router.delete(
  '/cards/:id',
  // validateObjectId,
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  // validateObjectId,
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  validateObjectId,
  dislikeCard,
);

module.exports = router;
