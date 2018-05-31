import moment from 'moment';
import mongoose from '../db';

const {
  Schema
} = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  content: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: String,
    required: false,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: String,
    required: false,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  added: {
    type: String,
    default: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
  }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;