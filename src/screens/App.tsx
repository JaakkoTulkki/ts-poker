import * as React from 'react';
import './App.css';
import { Game } from './game/game.presenter';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Poker</h1>
        </header>
        <p className="App-intro">
          <Game />
        </p>
      </div>
    );
  }
}

export default App;
