const express = require('express');
const app = express();
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
