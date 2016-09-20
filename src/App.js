import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {AlphaUtil} from './AlphaUtil';

class App extends Component {
  constructor() {
    super();
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.state = {
      result: this.alphabet
    };
  }

  onChange(e){
    console.log(AlphaUtil.explode("B.B.B.BB.", 2));
    var text = e.target.value;
    var result = AlphaUtil.listMissingLetter(text);
    this.setState({result});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-content">
          <input type="text" onChange={this.onChange.bind(this)}/>
          <p className="App-intro">
            The missing letters are: {this.state.result}
          </p>
          </div>
      </div>
    );
  }
}

export default App;
