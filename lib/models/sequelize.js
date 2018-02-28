const Sequelize = require('sequelize');

const Config = require('../config');

const sequelize = Sequelize(Config.DB.DATABASE, Config.DB.USERNAME, Config.DB.PASSWORD, Config.DB.OPTIONS);

module.exports = sequelize;
