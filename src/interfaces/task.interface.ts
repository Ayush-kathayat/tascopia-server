import { Document} from 'mongoose';

import ISubtask from './subtask.interface';

// Define ITask interface
interface ITask extends Document {
  title: string;
  description: string;
  subtasks: ISubtask[];
}

export default ITask;