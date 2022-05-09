const router = require('express').Router();
const {
  validateCardData,
  validateObjectId,
} = require('../utils/validator');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post(
  '/cards',
  validateCardData,
  createCard,
);
router.get('/cards', getCards);
router.delete(
  '/cards/:id',
  validateObjectId,
  deleteCard,
);
router.put(
  '/cards/:id/likes',
  validateObjectId,
  likeCard,
);
router.delete(
  '/cards/:id/likes',
  validateObjectId,
  dislikeCard,
);

module.exports = router;
