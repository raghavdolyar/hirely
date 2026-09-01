import express from 'express';

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
  console.log(req.url);
  res.json({
    message: 'server is working',
  });
});

export default app;
