import Models from '../models';

const {
  User
} = Models

export default class UserControllers {
  static signup(req, res) {
    const {
      name,
      email,
      website,
      password,
      confirmpassword
    } = req.body;

    const body = {
      name,
      email,
      website,
      password
    }

    const user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.status(201).header('x-auth', token).send({
        message: `you're logged in successfully`,
        user
      })
    }).catch(error => {
      res.status(403).send({
        message: `looks like a user with your email or website already exists`
      })
    })
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
        })
      })
    }).catch(error => {
      res.status(404).send({
        message: `user does not exists, please try again`
      })
    })
  }

  static deleteuserfortest(req, res) {
    if (req.path === '/delete/78y7y27yy5y5y/76468767333/7664t6767t67') {
      User.findOneAndRemove({
        email: "rossy@gmail.com"
      }).then(() => {
        res.end()
      })
    }
  }
}