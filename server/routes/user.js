import express from 'express';
import Controller from '../controllers';
import Utils from '../utils';

const router = express.Router();
const user = router;
const {
  signup,
  deleteuserfortest
} = Controller;
const {
  checkSignupInputs
} = Utils;

router.post('/signup', checkSignupInputs, signup);
router.delete('/delete/78y7y27yy5y5y/76468767333/7664t6767t67', deleteuserfortest)

export default user;