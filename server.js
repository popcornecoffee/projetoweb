const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let products = loadProductsFromFile();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  saveProductsToFile();
  res.json({ message: 'Produto cadastrado com sucesso!' });
});

function loadProductsFromFile() {
  try {
    const filePath = path.join(__dirname, 'products.json');

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
      console.log('Arquivo products.json criado.');
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar produtos do arquivo:', error.message);
    return [];
  }
}

function saveProductsToFile() {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(filePath, data);
    console.log('Produtos salvos no arquivo products.json.');
  } catch (error) {
    console.error('Erro ao salvar produtos no arquivo:', error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
