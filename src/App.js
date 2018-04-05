import React, { Component } from 'react';
//import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
//import update from 'react-addons-update'; // ES6
//var update = require('react-addons-update');
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doors: [], newdoor: ''
        };
        this.textInput = React.createRef();
       // this.focusTextInput = this.focusTextInput.bind(this);
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
                         <tr key={d.data}>
                             <td>{d.door_id}</td>
                             <td>{d.name}</td>
                         </tr>
                     )
                })
                this.setState({doors: doorKey, newdoor:''});
            })

    }

    addDoor(event){

      //  this.setState({ doors: [this.state.doors, this.state.newdoor]});

        fetch('http://localhost:8080/api/addDoor', {
           method: 'POST',
           headers: {'Accept': 'application/json','Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({"name": this.state.newdoor})//JSON.stringify("Hello")
        }).then( results => {
                return results.json();
            }).then(data=>{
            const newborn = <Trtable door_id={data.door_id} name={data.name} />;
            this.setState({ doors: [this.state.doors, newborn]});
        }).catch(function (error) {
                console.log(error);
        });
        event.preventDefault();
    }

    formChange(event) {
        this.setState({newdoor: event.target.value});
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DockDoor</h1>
        </header>
        <p className="App-intro"></p>
          <div className="container">
          <form className="form-horizontal">
              <div className="form-group">
                    <label className="col-sm-2 control-label" for="dname"> Door Name: </label>
                    <input type="text" id="dname" value={this.state.newdoor} onChange={this.formChange}/>

              </div>
              <div className="form-group">
                  <input type="submit" value="Add Door" onClick = {this.addDoor} className="btn btn-primary" />
              </div>
          </form>

          <table className="table">
              <thead>
                  <tr>
                      <th>Door Id</th>
                      <th>Door Name</th>
                  </tr>
              </thead>
              <tbody>
                    {this.state.doors}
              </tbody>
          </table>

          </div>
      </div>
    );
  }
}

function Trtable(props) {
    return <tr><td>{props.door_id}</td><td>{props.name}</td></tr>;
}

export default App;
