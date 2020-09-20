import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colorScale = scaleLinear()
  .domain([0.29, 0.68])
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

const WorldMap = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
  <React.Fragment>
    <Display attribute={"Location"} message={location} />
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147
          }}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      onClick={(e) => (setLocation(geo.properties.NAME))}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
    </React.Fragment>
  );
}

export default WorldMap;