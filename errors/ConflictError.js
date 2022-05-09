class ConflictError extends Error {
  constructor(message = 'HTTP 409 Conflict') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
