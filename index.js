const express = require('express');
const app = express();
app.use(express.json());

let products = [
    {id: 1, name: "Charger", price: 100},
    {id: 2, name: "Phone Case", price: 150},
    {id: 3, name: "Wire Headphones", price: 200}
];

const port = 5000;

app.get('/', (req, res) => {
    res.send("Server is running 🚀");
});
app.get('/about', (req, res) => {
    res.send("This is my about page.");
});
app.get('/contact', (req, res) => {
    res.send("here you can find contact.");
});
app.get('/products', (req, res) => {
    let filteredProducts = [...products];

    if (req.query.name) {
        const searchTerm = req.query.name.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
    }

    res.json(filteredProducts);
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: "Product name and price are required." });
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, name, price };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(p => p.id !== productId);
    res.status(204).send();
});
