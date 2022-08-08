import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../Skateparks/explore-page.css';
import SkateparkSnippet from '../Skateparks/SkateparkSnippet';

const containerStyle = {
  width: '1328px',
  height: '788px'
};

const center = {
  lat: 38.8338816,
  lng: -104.8213634
};

function Map({ allParks, filteredParks, tagId }) {
  const mappedSkateparks = tagId ? filteredParks : allParks;
  const [activeMarker, setActiveMarker] = useState(null);
  console.log(mappedSkateparks, 'always something bro')
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

  const onMarkerLoad = marker => {
    console.log('marker: ', marker)
  }

  return isLoaded ? (
      <GoogleMap
        onMouseOver={() => setActiveMarker(null)}
        className='google-map'
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
      >
        {!tagId && mappedSkateparks.map((sp, index) => {
          return (
            <MarkerF
              key={index}
              onLoad={onMarkerLoad}
              position={{ lat: sp.lat, lng: sp.long }}
              onMouseOver={() => {activeParkHandler(sp.id)}}
            >
              {activeMarker === sp.id ? (
                <InfoWindowF>
                  <SkateparkSnippet skatepark={sp}/>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          );
         })}
        {tagId && mappedSkateparks.map((sp, index) => {
          return (
            <MarkerF
              key={index}
              onLoad={onMarkerLoad}
              position={{ lat: sp.Skatepark.lat, lng: sp.Skatepark.long }}
              onMouseOver={() => {activeParkHandler(sp.Skatepark.id)}}
            >
              {activeMarker === sp.Skatepark.id ? (
                <InfoWindowF>
                  <SkateparkSnippet skatepark={sp.Skatepark}/>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          );
         })}
      </GoogleMap>
  ) : <></>
}

export default Map;
