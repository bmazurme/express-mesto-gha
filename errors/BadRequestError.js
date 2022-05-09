class BadRequestError extends Error {
  constructor(message = 'переданы некорректные данные в метод') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
