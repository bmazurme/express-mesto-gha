class UnauthorizedError extends Error {
  constructor(message = 'HTTP 401 Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
