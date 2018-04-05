import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doors: [], newdoor: ''
        };
        this.addDoor = this.addDoor.bind(this);
        this.formChange = this.formChange.bind(this);
    }

    componentDidMount() {

        fetch('http://localhost:8080/api/getAllDoors')
            .then( results => {
               return results.json();
            }).then(data => {
                let doorKey = data.map((d)=> {
                     return (
                         <div key={d.data}>
                             <p>{d.name}</p>
                         </div>
                     )
                })
                this.setState({doors: doorKey});
            })

    }

    addDoor(event){


        fetch('http://localhost:8080/api/addDoor', {
           method: 'POST',
           headers: {'Accept': 'application/json','Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({"name":"Hello World"})//JSON.stringify("Hello")
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    }

    formChange(event) {
        this.setState({door: event.target.value});
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

          <form>
              <label>
                  Door Name:
            <input ref="doorname" type="text" name='dname' value={this.state.door} onChange={this.formChange}/>
              </label>
            <input type="submit" value="Add Door" onClick = {this.addDoor} />
          </form>
          <h4>{this.state.doors}</h4>
          <h1>{this.state.door}</h1>
      </div>
    );
  }
}

export default App;
