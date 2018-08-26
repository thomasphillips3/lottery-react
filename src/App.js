import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Processing transaction...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Successfully entered!' })
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    
    this.setState({ message: "Processing transaction..." });
    
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'Winner has been selected'});
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
        
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Enter the Lottery</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <h4>Pick a Winner</h4>
        <button onClick={this.onClick}>Go!</button>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
