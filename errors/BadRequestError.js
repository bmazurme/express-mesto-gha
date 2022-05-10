class BadRequestError extends Error {
  constructor(message = 'HTTP 400 Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
