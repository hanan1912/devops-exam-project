// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
// "database-service" is the name we will give it in docker-compose later
mongoose.connect('mongodb://database-service:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Simple Data Model
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

// Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});

app.listen(5000, () => console.log('Server running on port 5000'));