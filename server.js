const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = 'data.json';

// Read data
const readData = () => {
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// CREATE
app.post('/add', (req, res) => {
    let data = readData();
    const newItem = { id: Date.now(), name: req.body.name };
    data.push(newItem);
    writeData(data);
    res.json(newItem);
});

// READ
app.get('/items', (req, res) => {
    res.json(readData());
});

// UPDATE
app.put('/update/:id', (req, res) => {
    let data = readData();
    data = data.map(item =>
        item.id == req.params.id ? { ...item, name: req.body.name } : item
    );
    writeData(data);
    res.send("Updated");
});

// DELETE
app.delete('/delete/:id', (req, res) => {
    let data = readData().filter(item => item.id != req.params.id);
    writeData(data);
    res.send("Deleted");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
