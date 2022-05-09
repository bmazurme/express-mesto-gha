class UnauthorizedError extends Error {
  constructor(message = 'авторизация с несуществующими email и password') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
