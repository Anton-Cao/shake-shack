import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import User from './components/User';
import './App.css';
import Button from 'react-bootstrap/Button'

// var React = require('react');
var Component = React.Component;


var rootStyle = {
  backgroundColor : 'black',
  color : 'white',
  height : '100%'
}



class App extends Component {  
    render() {
        return (
          <div className="app"
              style={
                rootStyle
              }>
            <img src={'/Vizit_Logo.png'} alt="Logo"/>
            <h3> Upload your data, and Viz it! Our platform will automatically extrapolate and present your data in a visually appealing and easy-to-understand manner. </h3>
            <BrowserRouter>
              <Switch>
                <Route path="/world/:key" children={<User map="world" />} />
                <Route path="/usa/:key" children={<User map="usa" />} />
                <Route path="/" children={<User />} />
              </Switch>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
