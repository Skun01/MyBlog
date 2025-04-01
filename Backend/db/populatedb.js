#! /usr/bin/env node
require('dotenv').config();
const {Client} = require('pg');

const query = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(256) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(50) UNIQUE,
    age INTEGER,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
async function main(){
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect();
    await client.query(query);
    await client.end();
    console.log('done!');
}

main();