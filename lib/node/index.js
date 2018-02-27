const axios = require('axios');

class Node {
    constructor(host, port, peers, ledger) {
        this.host = host;
        this.port = port;
        this.peers = [];
        this.blockchain = blockchain;
        this.hookLeger();
        this.connectToPeers(peers);
    }

    hookLedger() {
        // Hook blockchain so it can broadcast blocks or transactions changes
        this.ledger.emitter.on('blockAdded', (block) => {
            this.broadcast(this.sendLatestBlock, block);
        });

        this.ledger.emitter.on('transactionAdded', (newTransaction) => {
            this.broadcast(this.sendTransaction, newTransaction);
        });

        this.ledger.emitter.on('blockchainReplaced', (blocks) => {
            this.broadcast(this.sendLatestBlock, R.last(blocks));
        });
    }

    connectToPeer(newPeer) {
        this.connectToPeers([newPeer]);
        return newPeer;
    }

    connectToPeers(newPeers) {
        // Connect to every peer
        const me = `http://${this.host}:${this.port}`;
        newPeers.forEach((peer) => {            
            // If it already has that peer, ignore.
            if (!this.peers.find((element) => { return element.url == peer.url; }) && peer.url != me) {
                this.sendPeer(peer, { url: me });
                console.info(`Peer ${peer.url} added to connections.`);
                this.peers.push(peer);
                this.initConnection(peer);
                this.broadcast(this.sendPeer, peer);
            } else {
                console.info(`Peer ${peer.url} not added to connections, because I already have.`);
            }
        }, this);

    }

    initConnection(peer) {
        // It initially gets the latest block and all pending transactions
        this.getLatestLedgerEntry(peer);
        this.getTransactions(peer);
    }

    sendPeer(peer, peerToSend) {
        const URL = `${peer.url}/node/peers`;
        console.info(`Sending ${peerToSend.url} to peer ${URL}.`);
        return superagent
            .post(URL)
            .send(peerToSend)
            .catch((err) => {
                console.warn(`Unable to send me to peer ${URL}: ${err.message}`);
            });
    }
}
