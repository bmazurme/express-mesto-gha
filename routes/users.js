const router = require('express').Router();
const User = require('../models/user');
const {createUser, getUsers} = require('../controllers/users')

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);

module.exports = router;