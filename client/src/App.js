import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import User from './components/User';
import './App.css';
import AreaChart from "./graphs/AreaChart";

// var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./assets/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {  
    render() {
        return (
          <div className="app">
            <AreaChart/>
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
