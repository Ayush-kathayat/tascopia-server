import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/databaseConnection';

const app = express();

const PORT = process.env.PORT || 5050;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
