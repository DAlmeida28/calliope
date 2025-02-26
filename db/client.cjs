const { Client } = require('pg');
const client = new Client(process.env.DATABASEURL);

module.exports = client;
