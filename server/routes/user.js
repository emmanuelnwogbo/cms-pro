import express from 'express';
import Controller from '../controllers';
import Utils from '../utils';

const router = express.Router();
const user = router;
const {
  signup,
  socialSignup,
  signin,
  signout,
  deleteuserfortest
} = Controller;
const {
  checkSignupInputs,
  checkSigninInputs,
  authenticate
} = Utils;

router.post('/signup', checkSignupInputs, signup);
router.post('/social/signup', socialSignup)
router.post('/signin', checkSigninInputs, signin);
router.delete('/signout', authenticate, signout);
router.delete('/delete/78y7y27yy5y5y/76468767333/7664t6767t67', deleteuserfortest);

export default user;