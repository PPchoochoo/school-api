require('dotenv').config();

const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
                logging: false
            }
        );
    }
}

const database = new Database();

module.exports = database.sequelize;
