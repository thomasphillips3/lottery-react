import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    web3.eth.getAccounts()
      .then(console.log);
      
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          Contract managed by <span class="address">{this.state.manager}</span>.
          There are currently {this.state.players.length} players in the game playing for {web3.utils.fromWei(this.state.balance, 'ether')} ether.
        </p>
      </div>
    );
  }
}

export default App;
