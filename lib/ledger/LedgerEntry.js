class LedgerEntry {
  toHash() {

  }

  static get genesis() {
    // The gensis ledger is fixed
    return Block.fromJson(Config.genesisLedger);
  }

  static fromJson() {
  }
}
