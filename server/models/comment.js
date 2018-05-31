import mongoose from '../db';

const {
  Schema
} = mongoose;
const CommentSchema = new Schema({
  content: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'WebsiteUser'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;