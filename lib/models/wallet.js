const sequelize = require('./sequelize');

const Wallet = sequelize.define('wallet', {
  address: sequelize.STRING,
  balance: sequelize.BIGINT
});

module.exports = Wallet;
