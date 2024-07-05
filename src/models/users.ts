
import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import Task from "./tasks";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tasks: ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: Task }]
});

const User = mongoose.model<IUser>('User', UserSchema);


export default User;
export { IUser }; // Export the IUser interface for use in other files