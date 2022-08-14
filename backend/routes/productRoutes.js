import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  try {
    console.log(req.params.slug);
    const product = await Product.find((x) => x.slug === req.params.slug);
    if (product) {
      res.send('Success');
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (e) {
    res.send(e);
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
