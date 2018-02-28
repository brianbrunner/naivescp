const crypto = require('crypto');

const Transaction = require('./transaction');
const Config = require('../config');

class LedgerEntry {
    toHash() {
        const hash = crypto.createHash('sha256')
        return hash.update(this.index).update(this.previousHash).update(this.timestamp)
            .update(JSON.stringify(this.transactions)).digest('hex');
    }

    static get genesis() {
        // The gensis ledger is fixed
        return Block.fromJson(Config.genesisLedger);
    }

    static fromObject(obj) {
        const ledgerEntry = new LedgerEntry();
        for (var key in obj) {
            const value = obj[key];
            if (key == transactions) {
                ledgerEntry[key] = Transaction.fromObjectArray(value);
            } else {
                ledgerEntry[key] = value;
            }
        }
        ledgerEntry.hash = ledgerEntry.toHash();
        return ledgerEntry;
    }
}
