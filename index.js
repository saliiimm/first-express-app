const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

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

app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'PS5', price: 500000 },
    { id: 2, name: 'Manette PS5', price: 10000 },
    { id: 3, name: 'Fifa 25', price: 9000 },
  ];
  return res
    .status(200)
    .json({ message: 'Products retrieved successfully', products: products });
});
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const { nom, prenom, adress } = req.body;
  //search in the db product with this id
  return res
    .status(200)
    .json({ message: `Product with id ${id}  retrieved successfully` });
});
app.patch('/products/:id', (req, res) => {
  const { id } = req.params;
  //simulate a change
  return res
    .status(200)
    .json({ message: `Product with id ${id} changed successfully` });
});
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  //simulate a delete in the db
  return res
    .status(200)
    .json({ message: `Product with id ${id} deleted successfully` });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
