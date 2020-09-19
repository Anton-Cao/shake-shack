import React from 'react';
import logo from './logo.svg';
import './App.css';
import AreaChart from './graphs/AreaChart';

// var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./assets/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {   
    render() {
        return (
            <AreaChart/>
        );
    }
}

export default App;
