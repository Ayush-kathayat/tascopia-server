import { Document, Types } from 'mongoose';

import ISubtask from './subtask.interface';

// Define ITask interface
interface ITask extends Document {
  title: string;
  description: string;
  subtasks: Types.ObjectId[] | ISubtask[];
}

export default ITask;