import React from "react";
import "./App.css";
import Currency from "./Components/currency/Currency";
import MapFind from "./Components/map/MapFind";
import Weather from "./Components/weather/Weather";

function App() {
  return (
    <div className="App">
      <div className="mainContainer">
        <div className="climate">
          <Weather />
        </div>
        <div className="map">
          <MapFind />
          {/* <Currency /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
