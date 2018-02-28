const Db = require('../util/db');

const OPERATOR_FILE = 'wallets.db';

class Operator {
    constructor(dbName, ledger) {
        this.db = new Db(dbName + '/' + OPERATOR_FILE);

        this.ledger = ledger;
    }
}
