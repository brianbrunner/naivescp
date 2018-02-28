const EventEmitter = require('events');

const Db = require('../util/db');

const LEDGER_FILE = 'ledger.db';
const TRANSACTIONS_FILE = 'transactions.db';

class Ledger extends EventEmitter {
  constructor(dbName) {
    this.ledgerDb = new Db(dbName + '/' + LEDGER_FILE)
    this.transactionsDb = new Db(dbName + '/' + TRANSACTIONS_FILE)

    this.init();
  }

  
}

module.exports = Ledger;
