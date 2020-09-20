import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { geoCentroid } from "d3-geo";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import '../App.css';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import allStates from "../data/allstates.json";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const pinkScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#FFFFFF",
    "#FCD9E6",
    "#F9B4CD",
    "#F68EB4",
    "#F3689B",
    "#F04282",
    "#ED1D69",
    "#D01157",
    "#AA0E47"
  ]);

const blueScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#FFFFFF",
    "#D6FAFF",
    "#ADF4FF",
    "#85EFFF",
    "#5CE9FF",
    "#33E4FF",
    "#0ADEFF",
    "#00C2E0",
    "#009FB7"
  ]);

const purpleScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#FFFFFF",
    "#EADBFA",
    "#D4B7F5",
    "#BF93F0",
    "#A96FEB",
    "#944BE7",
    "#7E28E2",
    "#6B1BC5",
    "#5716A2"
  ]);

const divStyle = {
  color: "#FED766",
  fontSize: 40,
};

function Display(props){
    return(
      <div style={divStyle}>
        {props.attribute + ": " + props.message}
      </div>
    );
}
 
const AreaChart = () => {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        csv("/unemployment.csv").then(counties => {
        setData(counties);});}, []);


    return (
        <React.Fragment>
    <Display attribute={"Location"} message={location}/>
    <Display attribute={"Unemployment rate"} message={number}/>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={blueScale(cur ? cur.unemployment_rate : "#EEE")}
                  onClick={(e) => (
                    setLocation(cur.name),
                    setNumber(cur.unemployment_rate))}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      </React.Fragment>
      );
}

export default AreaChart;