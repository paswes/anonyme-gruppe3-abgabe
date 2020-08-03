const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,

    database: 'postgres',
    password: 'postgres',
    user: 'postgres',

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
};
