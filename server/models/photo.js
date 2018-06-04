import mongoose from '../db';

const {
  Schema
} = mongoose;
const PhotoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;