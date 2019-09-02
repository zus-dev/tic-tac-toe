/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { TicTacToe } from "./game";
import { TicTacToeBoard } from "./board";

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  //multiplayer: { local: true }
  multiplayer: { server: 'localhost:8000' }
});

const App = () => (
  <div>
    Player 0
    <TicTacToeClient playerID="0" />
    <br />
    Player 1
    <TicTacToeClient playerID="1" />
  </div>
);

render(<App />, document.getElementById("root"));
