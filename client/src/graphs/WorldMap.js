import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import { Slider } from '@material-ui/core';
import axios from 'axios';
import '../App.css';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colorScale = scaleLinear()
  .domain([1000, 30000])
  .range(["#FFFFFF", "#AA0E47"]);

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

const WorldMap = (props) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");

  const [hasTimestamps, setHasTimestamps] = useState(true);
  const [timestamps, setTimestamps] = useState([]);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const processData = (counties) => {
      let hasTs = counties.length > 0;
      counties.forEach((county) => {
        if (!county.timestamp) {
            console.log("BLAH");
            hasTs = false;
        }
      });
      if (hasTs) {
        const ts = new Set();
        const newData = {};
        counties.forEach((county) => {
          ts.add(parseInt(county.timestamp));
          if (!(county.iso3 in newData)) {
            newData[county.iso3] = {};
          }
          newData[county.iso3][county.timestamp] = county;
        });
        const tsArray = Array.from(ts);
        tsArray.sort();
        setData(newData);
        setTimestamps(tsArray);
        setTimestamp(tsArray[0]);
      } 
      else {
        const newData = {};
        counties.forEach((county) => {
          newData[county.iso3] = county;
        });
        setData(newData);
      }
    };

    if (props.name) {
      console.log('name', props.name);
      axios.get('/api/data/' + props.name)
        .then(function (response) {
          // handle success
          processData(response.data);
        });
    } else {
      csv("/tb.csv").then((data) => {
        processData(data);
      });
    }
  }, [props.name]);



  return (
    <React.Fragment>
        {
            hasTimestamps ?
                <div style={divStyle}>
                    <label>Timestamp: </label>
                    <Toggle timestampFn={setTimestamp} timestamps={timestamps} />
                </div>
            : <></>
        }
    <Display attribute={"Location"} message={location} />
    <Display attribute={"Total Cases"} message={number} />
    <ComposableMap projectionConfig={{rotate: [-10, 0, 0], scale: 147}}>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                    console.log(geo.properties.ISO_A3);
                    let cur;
                    if (hasTimestamps) {
                        if (data[geo.properties.ISO_A3]) {
                            cur = data[geo.properties.ISO_A3][timestamp];
                        }
                    } 
                    else {
                        cur = data[geo.properties.ISO_A3];
                    }
                    if (cur) {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={cur ? colorScale(cur.c_newinc) : "#F5F4F6"}
                          onClick={(e) => (setLocation(geo.properties.NAME), setNumber(cur.c_newinc))}
                        />
                      );
                    }
                })
              }
            </Geographies>
        </ComposableMap>
    </React.Fragment>
  );
}

export default WorldMap;