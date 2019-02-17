import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import gameReducer from './game';
import Board from './Board';
import './App.css';

const store = createStore(gameReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            BOGGLE!
          </header>

          <Board />
        </div>
      </Provider>
    );
  }
}

export default App;
