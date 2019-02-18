import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import gameReducer from './game';
import Board from './Board';
import Word from './Word';
import Score from './Score';
import Timer from './Timer';
import Leaderboard from './Leaderboard';
import './App.css';

const store = createStore(
  gameReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            BOGGLE!
          </header>

          <Timer />
          <Board />
          <Word />
          <Score />
          <Leaderboard />
        </div>
      </Provider>
    );
  }
}

export default App;
