import Models from '../models';

const {
  User,
  SocialUser
} = Models;

export default class UserControllers {
  static signup(req, res) {
    const {
      name,
      email,
      website,
      password
    } = req.body;

    const body = {
      name,
      email,
      website,
      password
    };

    const user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.status(201).header('x-auth', token).send({
        message: `you're logged in successfully`,
        user
      });
    }).catch(() => {
      res.status(403).send({
        message: `looks like a user with your email or website already exists`
      });
    });
  }

  static socialSignup(req, res) {
    const {
      uid,
      token,
      email
    } = req.body;

    const user = new SocialUser({
      uid,
      socialToken: token,
      email,
      password: uid
    })

    user.save().then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.status(201).header('x-auth', token).send({
        message: `you're logged in successfully`,
        user
      });
    }).catch(() => {
      res.status(403).send({
        message: `looks like something went wrong, please try signing up again`
      });
    });
  }

  static signin(req, res) {
    const {
      email,
      password
    } = req.body;

    User.findByCredentials(email, password).then(user => {
      return user.generateAuthToken().then(token => {
        res.status(200).header('x-auth', token).send({
          message: `welcome ${user.name}`
        });
      });
    }).catch(() => {
      res.status(404).send({
        message: `user does not exists, please try again`
      });
    });
  }

  static signout(req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send({
        message: `successfully signed out`
      });
    }, () => {
      res.status(400).send({
        message: `something went wrong!`
      });
    });
  }

  static deleteuserfortest(req, res) {
    if (req.path === '/delete/78y7y27yy5y5y/76468767333/7664t6767t67') {
      User.findOneAndRemove({
        email: "rossy@gmail.com"
      }).then(() => {
        res.end();
      });
    }
  }
}