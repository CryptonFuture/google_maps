import React, { useState, useRef, useEffect } from "react";
import {REACT_APP_GOOGLE_MAPS_KEY} from '../constants/constants'

let autocomplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const GooglePlcasesApi = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autocomplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "PK" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autocomplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4PO-2Fniyav15Hqg9a7tcDu9fFByJiF8&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="container-fluid mt-5 overflow-hidden">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 col-sm-12 col-md-12">
          <div className="search-location-input">
            <input
              ref={autoCompleteRef}
              className="form-control"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search Place..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePlcasesApi;
