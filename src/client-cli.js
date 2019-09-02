import Vorpal from 'vorpal';



import { Client } from "boardgame.io/client";
import { TicTacToe } from "./game";

/*
const TicTacToeClient = Client({
  game: TicTacToe,
  multiplayer: { server: '192.168.4.47:8000' }
});
*/

const spec = {
    game: TicTacToe,
    multiplayer: { server: '192.168.4.47:8000' }
};

const client1 = Client({ ...spec, playerID: '1' });
/* 
client1.transport.subscribe(() => {
});
*/

console.log("connecting...");
client1.connect();

const cli = new Vorpal();
cli.delimiter('client1$');

cli.command('click-cell <id>', 'Clicks specified cell.').action((args, callback) => {
  client1.moves.clickCell(args.id);
  client1.events.endTurn();
  callback();
});

cli.command('get-secret').action((args, callback) => {
  client1.moves.getSecret();
  callback();
});

cli.command('get-state [prop]').action((args, callback) => {
  const state = client1.getState();
  const val = args.prop ? state[args.prop] : state;
  console.log(val);
  callback();
});

client1.subscribe(() => {
  if (client1.transport.isConnected && client1.getState()) {
    console.log(`connected to ${client1.transport.socket.io.engine.hostname}`);
  } else {
    return;
  }

  console.log("callback");

  cli.show();
  //client1.moves.clickCell(0);
  //client1.events.endTurn();
});

