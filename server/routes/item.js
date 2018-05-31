import express from 'express';
import Controller from '../controllers';
import Utils from '../utils';

const router = express.Router();
const item = router;
const {
  postitem
} = Controller;
const {
  authenticate
} = Utils;

router.post('/', authenticate, postitem);

export default item;