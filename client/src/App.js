import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import User from './components/User';
import './App.css';
import CountyMap from "./graphs/CountyMap";

// var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./assets/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
            <img src={'/Vizit_Logo.png'}/>
            <h3> Upload your data, and Viz it! Our platform will automatically extrapolate and present your data in a visually appealing and easy-to-understand manner. </h3>
            <BrowserRouter>
              <Switch>
                <Route path="/:key" children={<User />} />
                <Route path="/" children={<User />} />
              </Switch>
            </BrowserRouter>
          </div>
        );
    }
}

export default App;
