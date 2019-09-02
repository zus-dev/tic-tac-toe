/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game, PlayerView } from "boardgame.io/core";

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] != symbol) {
        winner = null;
        break;
      }
    }
    if (winner != null) return true;
  }

  return false;
}

export const TicTacToe = Game({
  name: "tic-tac-toe",

  playerView: PlayerView.STRIP_SECRETS,

  setup: () => ({
    secret: { secretValue: "This is hidden value" },
    players: {
      '0': { score: 0 },
      '1': { score: 1 }
    },
    cells: Array(9).fill(null)
  }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      if (G.secret && G.secret.secretValue) {
        console.log(G.secret.secretValue);
      }
      if (G.players[0]) {
        console.log(G.players[0].score);
      }
      if (G.players[1]) {
        console.log(G.players[1].score);
      }

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    },
    getSecret(G, ctx) {
      if (!G.secret) {
        console.log("I don't know the secret :(");
        return;
      }
      console.log("I know the secrect! :)");
      G.players[ctx.currentPlayer].secretValue = G.secret.secretValue;
    }
  },

  flow: {
    //movesPerTurn: 1,

    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (G.cells.filter(c => c === null).length == 0) {
        return { draw: true };
      }
    }
  }
});

