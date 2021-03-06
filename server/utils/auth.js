import validator from 'validator';
import Models from '../models';

const {
  User
} = Models;

export default class Auth {
  static checkSignupInputs(req, res, next) {
    const {
      name,
      email,
      website,
      password,
      confirmpassword
    } = req.body;

    const inputs = [name, email, website, password, confirmpassword];
    const emptyInputs = inputs.filter(i => i.length < 1);
    const numbers = inputs.filter(i => i++);

    if (emptyInputs.length > 0 || numbers.length > 0) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    if (!validator.isEmail(email) || !validator.equals(password, confirmpassword)) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    next();
  }

  static checkSocialSignupInputs(req, res, next) {
    const {
      email,
      uid,
      token
    } = req.body;
    const inputs = [email, uid, token];
    const emptyInputs = inputs.filter(i => i.length < 2);
    const numbers = inputs.filter(i => i++);

    if (emptyInputs.length > 0 || numbers.length > 0) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    next();
  }

  static checkSigninInputs(req, res, next) {
    const {
      email,
      password
    } = req.body;

    const inputs = [email, password];
    const emptyInputs = inputs.filter(i => i.length < 1);
    const numbers = inputs.filter(i => i++);

    if (emptyInputs.length > 0 || numbers.length > 0) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(403).send({
        error: `please make sure all fields are filled correctly`
      });
    }

    next();
  }

  static authenticate(req, res, next) {
    const token = req.header('x-auth');

    User.findByToken(token).then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    }).catch(error => {
      res.status(401).send({
        message: `unauthorized: something went wrong`
      });
    });
  }
}