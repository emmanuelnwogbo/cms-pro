import express from 'express';
import user from './user';
import item from './item';

const router = express.Router();
const index = router;

router.get('/', (req, res) => {
  res.status(200).send({
    message: `Welcome to CMS PRO`
  });
});

export default {
  index,
  user,
  item
};