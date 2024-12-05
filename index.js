const express = require('express');
const cors = require('cors');
const Game = require('./src/models/Game');
const app = express();
const port = 3000;

require('./src/config/connectDb');

app.use(express.json());
express.urlencoded({ extended: true });
app.use(
  cors({
    origin: 'https://salimwebsite.com',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/products', async (req, res) => {
  const { name, category, minimumAge, price } = req.body;
  try {
    const newproduct = new Game({ name, category, minimumAge, price });
    await newproduct.save();
    return res
      .status(201)
      .json({ message: 'product saved succesfully', newproduct: newproduct });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'An error occured with the server!' });
  }
});
app.get('/products', async (req, res) => {
  try {
    const products = await Game.find();
    return res
      .status(200)
      .json({ message: 'Products retrieved successfully', products: products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'An error occured with the server!' });
  }
});
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Game.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    return res.status(200).json({
      message: `Product with id ${id}  retrieved successfully`,
      product: product,
    });
  } catch (err) {
    return res.status(500).json({ message: `Error occured with the server` });
  }
});
app.patch('/products/change-price/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updatedProduct = await Game.findByIdAndUpdate(
      id,
      { price: price },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    await updatedProduct.save();
    return res.status(200).json({
      message: `Product with id ${id} changed successfully`,
      updatedProduct: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: `Error occured with the server` });
  }
});
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Game.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    return res.status(200).json({ message: `Product  deleted successfully` });
  } catch (err) {
    return res.status(500).json({ message: `Error occured with the server` });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
