const router = require('express').Router();
const {
  validateObjectId,
  validateAvatarData,
  validateUserData,
} = require('../utils/validator');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get(
  '/users/:id',
  validateObjectId,
  getUser,
);

router.patch(
  '/users/me',
  validateUserData,
  updateUser,
);
router.patch(
  '/users/me/avatar',
  validateAvatarData,
  updateAvatar,
);

module.exports = router;
