const db = require('mysql2/promise');

const connection = db.createConnection({
    host: 'MySQL-8.0',
    user: 'root',
    password: '',
    database: 'lb_pdo_lessons'
});

module.exports = connection;