// const HttpServer = require('./httpServer');
const Ledger = require('./ledger');
// const Operator = require('./operator');
const Node = require('./node');

module.exports = function naivecoin(host, port, peers, logLevel, name) {
    host = process.env.HOST || host || 'localhost';
    port = process.env.PORT || process.env.HTTP_PORT || port || 9891;
    peers = (process.env.PEERS ? process.env.PEERS.split(',') : peers || []);
    peers = peers.map(peer => { 
        const peerParts = peer.split(':');
        return {
          host: peerParts[0],
          port: peerParts[1]
        };
    });
    logLevel = (process.env.LOG_LEVEL ? process.env.LOG_LEVEL : logLevel || 6);    
    name = process.env.NAME || name || '1';

    require('./util/consoleWrapper.js')(name, logLevel);

    console.info(`Starting node ${name}`);

    let ledger = new Ledger(name);
    // let operator = new Operator(name, blockchain);
    let node = new Node(host, port, peers, ledger);
    // let httpServer = new HttpServer(node, blockchain, operator, miner);

    // httpServer.listen(host, port);
};
