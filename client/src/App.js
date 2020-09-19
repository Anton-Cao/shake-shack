import React from 'react';
import FileUpload from './components/FileUpload';
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
          <div className="app">
            <AreaChart/>
            <FileUpload/>
          </div>
        );
    }
}

export default App;
