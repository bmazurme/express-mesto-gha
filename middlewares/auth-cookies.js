const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const SECRET = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies ? req.cookies.jwt : '';

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  next();
};
