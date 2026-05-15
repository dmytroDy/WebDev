const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.1.15:27017';
const client = new MongoClient(url);
const dbName = 'compdb';

async function getCollection() {
    try {
        await client.connect();
        const db = client.db(dbName);
        return db.collection('computers');
    } catch (err) {
        console.error("Помилка підключення до MongoDB:", err.message);
        throw err;
    }
}

module.exports = getCollection;