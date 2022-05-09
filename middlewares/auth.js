const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED_CODE } = require('../utils/constants');

const handleAuthError = (res) => {
  res
    .status(ERROR_UNAUTHORIZED_CODE)
    .send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return handleAuthError(res);
  // }

  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies ? req.cookies.jwt : '';

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
