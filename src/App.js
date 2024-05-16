import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GooglePlcasesApi from "./components/GooglePlcasesApi";
import Map from "./components/Map";

// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '100vw',
//   height: '100vh',
// };
// const center = {
//   lat: 24.8607,
//   lng: 67.0011,
// };

// const google = window.google;

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 24.8607,
    lng: 67.0011,
  });
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyA4PO-2Fniyav15Hqg9a7tcDu9fFByJiF8',
  //   libraries,
  // });

  // if (loadError) {
  //   return <div>Error loading maps</div>;
  // }

  // if (!isLoaded) {
  //   return <div>Loading maps</div>;
  // }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap> */}
      <GooglePlcasesApi setSelectedLocation={setSelectedLocation} />
      <Map selectedLocation={selectedLocation} />
    </div>
  );
}

export default App;
