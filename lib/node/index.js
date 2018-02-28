const axios = require('axios');
const dnode = require('dnode');

class Node {
    constructor(host, port, peers, ledger) {
        this.host = host;
        this.port = port;
        this.peers = [];
        this.ledger = ledger;
        // this.hookLedger();
        this.initRPC();
        this.connectToPeers(peers);
    }

    info() {
      return {
        host: this.host,
        port: this.port
      }
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

    initRPC() {
      this.rpcServer = dnode({
        info: (cb) => {
          cb(this.info());
        },
        addPeer: (peer, cb) => {
          this.addPeer(peer, cb);
        },
        fetchBlocks: (options, cb) => {
          this.fetchLatestBlock(options, cb);
        },
        fetchTransactions: (options, cb) => {
          this.fetchTransactions(options, cb);
        },
        confirmTransaction: (transaction, cb) => {
          this.confirmTransaction(transaction, cb);
        }
      });
      this.rpcServer.listen(this.port, this.host);
      this.rpcRemotes = {};
    }

    async connectToPeer(newPeer) {
        await this.connectToPeers([newPeer]);
        return newPeer;
    }

    async connectToPeers(newPeers) {
        const nodeInfo = {
          host: this.host,
          peer: this.peer
        };
        newPeers.forEach(async peer => {            
            if (typeof peer == "string") {
              const peerParts = peer.split(':');
              peer = {
                host: peerParts[0],
                port: peerPart[1]
              }
            }
            // If it already has that peer, ignore.
            if (!this.peers.find(element => { return element.host == peer.host && element.port == peer.port; }) && 
                    (peer.host != this.host || peer.port != this.port)) {
                await this.initConnection(peer.host, peer.port);
                this.peers.push(peer);
                console.info(`Peer ${peer.host}:${peer.port} added to connections.`);
                // this.sendPeer(peer, nodeInfo);
                // this.broadcast(this.sendPeer, peer);
            } else {
                console.info(`Peer ${peer.host}:${peer.port} not added to connections, because I already have it.`);
            }
        }, this);

    }

    initConnection(host, port) {
        const d = dnode();
        return new Promise((resolve, reject) => {
          const remoteKey = host+':'+port;
          var connected = false;
          d.connect(host, port);
          d.on('remote', (remote) => {
            this.rpcRemotes[remoteKey] = remote;
            //this.getLatestLedgerEntry(peer);
            //this.getTransactions(peer);
            remote.info(info => {
              connected = true;
              console.info(`Successfully connected to ${info.host}:${info.port}.`);
              resolve(remote);
            });
          });
          d.on('fail', (error) => {
            console.warn(error);
          });
          d.on('end', () => {
            if (connected) {
              delete this.rpcRemotes[remoteKey];
              console.info(`Disconnected from ${host}:${port}.`);
            }
          });
          d.on('error', (error) => {
            // We can handle normal errors elsewhere
            if (error.message.indexOf('ECONNREFUSED') != -1 ||
                (error.message.indexOf('ECONNRESET') != -1 && !connected)) { 
              console.info(`Failed to connect to ${host}:${port}.`);
              reject(error);
            } else if (error.message.indexOf('ECONNRESET') != -1) {
              delete this.rpcRemotes[remoteKey];
              console.info(`Disconnected from ${host}:${port}.`);
            }
          });
        });
    }
}

module.exports = Node;
