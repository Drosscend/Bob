require('dotenv').config();

const Client = require('./core/client.js');
const client = new Client();

client.login(process.env.TOKEN);
