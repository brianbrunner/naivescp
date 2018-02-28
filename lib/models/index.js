const sequelize = require('./sequelize');

const Wallet = require('./wallet');
const Transaction = require('./transaction');

async function init() {
    await sequelize.sync();
}

module.exports = {
    sync: sync,

    Wallet: Wallet,
    Transaction: Transaction
}
