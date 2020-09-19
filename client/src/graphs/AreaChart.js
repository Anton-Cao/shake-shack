import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { geoCentroid } from "d3-geo";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
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

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};
 
const AreaChart = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        csv("/unemployment.csv").then(counties => {
        setData(counties);});}, []);

    return (
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      );
}

export default AreaChart;