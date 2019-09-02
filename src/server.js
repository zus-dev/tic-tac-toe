const Server = require('boardgame.io/server').Server;
const TicTacToe = require('./game').TicTacToe;
const server = Server({ games: [TicTacToe] });
console.log("starting...");
server.run(8000);
console.log("started");
