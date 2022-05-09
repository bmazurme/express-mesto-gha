const router = require('express').Router();
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
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUser);
router.get('/users/me', updateUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
