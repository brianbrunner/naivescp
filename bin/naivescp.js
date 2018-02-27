#!/usr/bin/env node
const naivescp = require('../lib/naivescp');

const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .alias('h', 'host')
    .describe('h', 'Host address. (localhost by default)')
    .alias('p', 'port')
    .describe('p', 'HTTP port. (9891 by default)')
    .alias('l', 'log-level')
    .describe('l', 'Log level (7=dir, debug, time and trace; 6=log and info; 4=warn; 3=error, assert; 6 by default).')
    .describe('peers', 'Peers list.')
    .describe('name', 'Node name/identifier.')
    .alias('n', 'name')
    .array('peers')
    .help('help')
    .argv;

naivescp(argv.host, argv.port, argv.peers, argv.logLevel, argv.name);
