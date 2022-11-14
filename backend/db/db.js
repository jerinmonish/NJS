require('dotenv').config()
const { Sequelize } = require('sequelize');
const db = new Sequelize('nde', 'root', 'root', {
    host: process.env.HOST,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;