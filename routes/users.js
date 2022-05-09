const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const { reg } = require('../utils/validator');
const {
  // createUser,
  // login,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// router.post('/signup', createUser);
// router.post('/signin', login);
router.get('/users', getUsers);
router.get('/users/:id', getUsers);
router.get('/users/me', getCurrentUser);
router.get(
  '/users/:id',
  // celebrate({
  //   params: Joi.object().keys({
  //     userId: Joi.string().length(24).hex().required(),
  //   }),
  // }),
  getUser,
);
router.get('/users/me', updateUser);
router.patch(
  '/users/me',
  // celebrate({
  //   body: Joi.object().keys({
  //     name: Joi.string().min(2).max(30),
  //     about: Joi.string().min(2).max(30),
  //   }),
  // }),
  updateUser,
);
router.patch(
  '/users/me/avatar',
  // celebrate({
  //   body: Joi.object().keys({
  //     avatar: Joi.string().pattern(reg).required(),
  //   }),
  // }),
  updateAvatar,
);

module.exports = router;
