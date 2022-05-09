class NotFoundError extends Error {
  constructor(message = 'HTTP 404 Not Found') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
