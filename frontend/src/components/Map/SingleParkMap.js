import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../Skateparks/explore-page.css';
import SkateparkSnippet from '../Skateparks/SkateparkSnippet';
import '../Skateparks/skatepark-snippet.css';

const containerStyle = {
  width: '500px',
  height: '400px'
};

// const center = {
//   lat: 38.8338816,
//   lng: -104.8213634
// };

function SingleParkMap({ skatepark }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const center = {
    lat: skatepark.lat,
    lng: skatepark.long
  }

  const activeParkHandler = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    else {
      setActiveMarker(marker);
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD1pifB4N1PgR85IcIvLVvfV2etG6Sb0-g"
  })

  return isLoaded ? (
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
      >

            <MarkerF
              position={center}
              onMouseOver={() => {activeParkHandler(skatepark.id)}}
            >
              {activeMarker === skatepark.id ? (
                <InfoWindowF>
                  <SkateparkSnippet skatepark={skatepark}/>
                </InfoWindowF>
              ) : null}
            </MarkerF>


      </GoogleMap>
  ) : <></>
}

export default SingleParkMap;
