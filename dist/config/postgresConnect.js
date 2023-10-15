"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
//Create a new PostgreSQL client instance
const prodConnection = { connectionString: process.env.DB_URL_PROD, ssl: true };
const client = new pg_1.Client(prodConnection);
//Connect to the PostgreSQL server
const connect = client.connect((err) => {
    if (err)
        console.error('Error connecting to PostgreSQL: ', err.stack);
    else
        console.log('Connected to PostgreSQL database');
});
exports.default = { client, connect };
//# sourceMappingURL=postgresConnect.js.map