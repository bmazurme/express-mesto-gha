const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введён некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// userSchema.statics.findUserByCredentials = (email, password) => {
//   console.log({ email, password });
//   this.findOne({ email }).then((user) => {
//     if (!user) {
//       return Promise.reject(new Error('Неправильные почта или пароль'));
//     }
//     return bcrypt.compare(password, user.password)
//       .then((matched) => {
//         if (!matched) {
//           return Promise.reject(new Error('Неправильные почта или пароль'));
//         }
//         console.log(user);
//         return user;
//       });
//   });
// };

module.exports = mongoose.model('user', userSchema);
