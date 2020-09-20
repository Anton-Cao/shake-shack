import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { geoCentroid } from "d3-geo";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import { Slider } from '@material-ui/core';
import '../App.css';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import allStates from "../data/allstates.json";
import axios from 'axios';
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

function Display(props) {
  return (
    <div style={divStyle}>
      {props.attribute + ": " + props.message}
    </div>
  );
}

function Toggle(props) {
  const marks = [];
  for (let ts of props.timestamps) {
    marks.push({
      value: ts,
      label: ts
    });
  }
  return (<Slider
    style={divStyle}
    onChange={(event, value) => {
      props.timestampFn(value);
      if(props.currData[value]){
        props.valFn(props.currData[value].unemployment_rate);
      }
    }}
    defaultValue={props.timestamps[0]}
    aria-labelledby="discrete-slider"
    valueLabelDisplay="on"
    step={null}
    marks={marks}
    min={props.timestamps[0]}
    max={props.timestamps[props.timestamps.length - 1]}
  />);
}

const CountyMap = (props) => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [currdata, setCurrdata] = useState([]);

  const [hasTimestamps, setHasTimestamps] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const processData = (counties) => {
      let hasTs = counties.length > 0;
      counties.forEach((county) => {
        if (!county.timestamp) {
          hasTs = false;
        }
      });

      if (hasTs) {
        const ts = new Set();
        const newData = {};
        counties.forEach((county) => {
          ts.add(parseInt(county.timestamp));
          if (!(county.id in newData)) {
            newData[county.id] = {};
          }
          newData[county.id][county.timestamp] = county;
        });
        const tsArray = Array.from(ts);
        tsArray.sort();
        setData(newData);
        setTimestamps(tsArray);
        setTimestamp(tsArray[0]);
      } else {
        const newData = {};
        counties.forEach((county) => {
          newData[county.id] = county;
        });
        setData(newData);
      }
      setHasTimestamps(hasTs);
    };

    if (props.name) {
      axios.get('/api/data/' + props.name)
        .then(function (response) {
          // handle success
          processData(response.data);
        });
    } else {
      csv("/unemployment_timestamps.csv").then(counties => {
        processData(counties);
      });
    }
  }, [props.name]);

  return (
    <React.Fragment>
      {
        hasTimestamps ?
          <div style={divStyle}>
            <label>Timestamp: </label>
            <Toggle timestampFn={setTimestamp} valFn={setNumber} currData={currdata} timestamps={timestamps} />
          </div>
          : <></>
      }
      <Display attribute={"Location"} message={location} />
      <Display attribute={"Unemployment Rate"} message={number} />
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              let cur = data[geo.id];
              if (cur) {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={blueScale(cur[timestamp] ? cur[timestamp].unemployment_rate : "#EEE")}
                    onClick={(e) => {
                        if(cur[timestamp]){
                            setLocation(cur[timestamp].name); 
                            setCurrdata(cur);
                            setNumber(cur[timestamp].unemployment_rate);
                        }
                    }}
                  />
                );
              }
            })
          }
        </Geographies>
      </ComposableMap>
    </React.Fragment >
  );
}

export default CountyMap;