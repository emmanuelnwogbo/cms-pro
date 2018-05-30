import _ from 'lodash';
import validator from 'validator';

export default class Auth {
  static checkSignupInputs(req, res, next) {
    let {
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

  static checkSigninInputs(req, res, next) {
    let {
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
}