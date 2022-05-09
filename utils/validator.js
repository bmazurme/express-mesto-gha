const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');

const StringRequired = Joi.string().required();
const reg = /^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: StringRequired.custom((value) => {
      if (!isValidObjectId(value)) {
        throw new BadRequestError('переданы некорректные данные');
      }
      return value;
    }),
  }),
});

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(reg).required(),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegistrData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(reg),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateAvatarData = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(reg).required(),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validateObjectId,
  validateCardData,
  validateLoginData,
  validateRegistrData,
  validateAvatarData,
  validateUserData,
};
