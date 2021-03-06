import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

export default mongoose;