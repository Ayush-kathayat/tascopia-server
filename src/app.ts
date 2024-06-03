import express from 'express';

const app = express();

const PORT = process.env.PORT || 5050;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
