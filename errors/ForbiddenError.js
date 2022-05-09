class ForbiddenError extends Error {
  constructor(message = 'HTTP 403 Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
