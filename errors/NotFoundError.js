class NotFoundError extends Error {
  constructor(message = 'страница не найдена') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
