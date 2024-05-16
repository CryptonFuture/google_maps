import React, { useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Marker,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

const Map = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA4PO-2Fniyav15Hqg9a7tcDu9fFByJiF8',
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12 col-lg-12 col-sm-12 col-md-12">
          <div style={{ marginTop: "50px" }}>
            <GoogleMap
              mapContainerStyle={{
                height: "800px",
              }}
              center={selectedLocation}
              zoom={13}
              onLoad={onMapLoad}
            >
              <MarkerF
                position={selectedLocation}
                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
              />
              
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
