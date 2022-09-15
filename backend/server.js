import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors';
dotenv.config();

console.log(process.env.MONGODB_URI)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db',process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
