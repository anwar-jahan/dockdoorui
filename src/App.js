import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {door: ''}
        this.addDoor = this.addDoor.bind(this);
    }

    componentDidMount() {

    }

    addDoor(e){

        this.setState({door: 'Hello World'});
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <input type="text" id='dname' name='dname' value =''/>
          <button onclick = {this.addDoor}>Add Door</button>
          <h3>{this.state.door}</h3>
      </div>
    );
  }
}

export default App;
