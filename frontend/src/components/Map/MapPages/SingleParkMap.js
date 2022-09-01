import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import SkateparkSnippet from '../SkateParkInfoMarker/SkateparkSnippet';
import '../../Skateparks/ExplorePage/explore-page.css';
import '../SkateParkInfoMarker/skatepark-snippet.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

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
