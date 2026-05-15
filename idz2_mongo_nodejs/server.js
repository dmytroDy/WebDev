const express = require('express');
const getCollection = require('./db');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/computers', async (req, res) => {
    const { type, value } = req.query;
    const collection = await getCollection();
    let filter = {};

    switch (type) {
        case 'cpu':
            filter = { cpu: value };
            break;
        
        case 'software':
            filter = { software: value };
            break;

        case 'expired':
            const currentYear = new Date().getFullYear();
            filter = {
                $expr: {
                    $lt: [
                        { $add: ["$year", "$warranty_years"] },
                        currentYear
                    ]
                }
            };
            break;

        default:
            return res.status(400).json({ error: "Unknown type" });
    }

    try {
        const results = await collection.find(filter).project({ _id: 0 }).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/start', async (req, res) => {
    try {
        const collection = await getCollection();
        
        const cpus = await collection.distinct('cpu');
        const softs = await collection.distinct('software');
        
        res.json({ cpus, softs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});