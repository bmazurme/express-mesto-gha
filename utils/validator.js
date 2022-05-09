const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const BadRequestError = require('../errors/BadRequestError');

const StringRequired = Joi.string().required();

const reg = /^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;
const isLink = (link) => reg.test(link);

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: StringRequired.custom((value) => {
      console.log(value);
      if (!isValidObjectId(value)) {
        // throw new CelebrateError('Переданы некорректные данные');
        throw new BadRequestError('переданы некорректные данные');
      }
      return value;
    }),
  }),
});

module.exports = { isLink, reg, validateObjectId };
