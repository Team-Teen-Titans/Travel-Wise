const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('<Client ID String>');
require('dotenv').config({ path: '../.env' });

const { Pool } = require('pg');
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const session = require('express-session');

const pool = new Pool(databaseConfig);

const authentication = {};

module.exports = authentication;
