import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../../Skateparks/ExplorePage/explore-page.css';
import SkateparkSnippet from '../SkateParkInfoMarker/SkateparkSnippet';
import '../SkateParkInfoMarker/skatepark-snippet.css';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 38.8338816,
  lng: -104.8213634
};

function Map({ allParks, filteredParks, tagId, activeMarker, setActiveMarker }) {
  const mappedSkateparks = tagId ? filteredParks : allParks;

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

  useEffect(() => {
    document.getElementById('explore').addEventListener('mouseover', closeSkateparkSnippet );
    document.getElementById('footer-explore').addEventListener('mouseover', closeSkateparkSnippet);
  },[]);

  const closeSkateparkSnippet = () => {
    setActiveMarker(null);
  }

  return isLoaded ? (
      <GoogleMap
        className='map'
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
      >
        {!tagId && mappedSkateparks.map((sp, index) => {
          return (
            <MarkerF
              key={index}
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
        {tagId && mappedSkateparks && mappedSkateparks.length && mappedSkateparks.map((sp, index) => {
          return (
            <MarkerF
              key={index}
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
