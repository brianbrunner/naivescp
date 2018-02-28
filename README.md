# naivescp

A (work in progress) cryptocurrency implementation that relies on the Stellar Consensus Protocol. This project is
heavily informed by [naivecoin](https://github.com/conradoqg/naivecoin), to the point that a lot of code was
copy/pasted and lightly modified.

# Why SCP?

Trustlessness in other blockchain technologies is impressive but costly due to proof of work. Proof of stake is a
viable alternative, but potentially limits the participants in consensus to large players. The Stellar Consensus
Protocol (SCP) allows consensus to be agreed upon purely through trust that parties establish between one another.

This allows small or non-funded entities (such as non-profits) to have an equal footing with large institutions
(e.g. banks) in establishing consensus. We also eliminate costly consensus algorithms, allowing transaction to
be executed much faster at a substantially cheaper cost.

# Peer Communication

Peer communication is done via [dnode](https://github.com/substack/dnode) rather than via pure HTTP. Dnode allows
us to abstract away just a little bit more than an HTTP server solution would. It could be argued that this does
belong in a "naive" project, but I'm a believer that dnode is an easy-to-understand RPC framework and fits the
bill for the goal of this project.

# Storage

Data is stored using [leveldb](https://github.com/google/leveldb) via the 
[levelup](https://github.com/Level/levelup)/[leveldown](https://github.com/Level/leveldown) pacakges. 
Each entity type (wallets, transactions, and ledger entries) all use their own database rather than sharing
a common database.
