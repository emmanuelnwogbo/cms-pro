import validator from 'validator';
import mongoose from '../db';

const {
  Schema
} = mongoose;
const WebsiteUserSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    required: true
  }
});

const WebsiteUser = mongoose.model('WebsiteUser', WebsiteUserSchema);
export default WebsiteUser;