
import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import Task from "./tasks";



const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: Task }]
});

const User = mongoose.model('User', UserSchema);


export default User;
