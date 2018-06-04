import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import mongoose from '../db';

const {
  Schema
} = mongoose;
const SocialUserSchema = new Schema({
  uid: {
    type: String,
    required: true,
    trim: true
  },
  socialToken: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  website: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

SocialUserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

SocialUserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET).toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

SocialUserSchema.methods.removeToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

SocialUserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

SocialUserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({
    email
  }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

SocialUserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const SocialUser = mongoose.model('SocialUser', SocialUserSchema);

export default SocialUser;