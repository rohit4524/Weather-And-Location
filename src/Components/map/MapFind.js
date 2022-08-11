import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapGoogle = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    };
    fetchLocation();
    // console.log(latitude, longitude);
  }, [latitude, longitude]);

  if (latitude !== "" && longitude !== "") {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    );
  }

  return <div></div>;
};

const WrappedMap = withScriptjs(withGoogleMap(MapGoogle));

const key = "AIzaSyDvpBvmxk-H3dsV_nv_p_x3d9zBasVDDpU";
const api = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`;

function MapFind() {
  return (
    <div>
      <p style={{ fontSize: "50px", letterSpacing: "3px" }}>Google Map</p>
      <div
        style={{
          width: "50vw",
          height: "60vh",
          marginTop: "45px",
        }}
      >
        <WrappedMap
          googleMapURL={api}
          loadingElement={<div style={{ height: `50%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `70%`, borderRadius: `10px` }} />}
        />
      </div>
    </div>
  );
}

export default MapFind;
