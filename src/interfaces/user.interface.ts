import { Document, Types } from 'mongoose';

import ITask from './task.interface';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tasks: Types.ObjectId[] | ITask[]; // Use ITask[] if you plan to work with populated tasks
}

export default IUser;