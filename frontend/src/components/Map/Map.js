import React, { useEffect } from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import '../Skateparks/explore-page.css';

const containerStyle = {
  width: '1328px',
  height: '788px'
};

const center = {
  lat: 38.8338816,
  lng: -104.8213634
};

function Map({ allParks, filteredParks, tagId }) {
  console.log(filteredParks, 'fparks')
  const mappedSkateparks = tagId ? filteredParks : allParks;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD1pifB4N1PgR85IcIvLVvfV2etG6Sb0-g"
  })

  const onMarkerLoad = marker => {
    console.log('marker: ', marker)
  }

  return isLoaded ? (
      <GoogleMap
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
            />
          );
         })}
        {tagId && mappedSkateparks.map((sp, index) => {
          return (
            <MarkerF
              key={index}
              onLoad={onMarkerLoad}
              position={{ lat: sp.Skatepark.lat, lng: sp.Skatepark.long }}
            />
          );
         })}
      </GoogleMap>
  ) : <></>
}

export default Map;
