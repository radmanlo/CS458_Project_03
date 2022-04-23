/*import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap} from "react-google-maps";

function Map(){
    return (
        <GoogleMap 
            defaultZoom={10}
            defaultCenter={{lat:45.421532, len:-75.697189}}
        />
    );
}


const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function ShowCountry (){
    return(
        <div style={{ width: "1000px", height: "1000px" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDm89aBFc66paInqWQOz8Z7OxPm79Xh6ws`}
          loadingElement={<div style={{ height: `1000px`, width:'1000px' }} />}
          containerElement={<div style={{ height: `1000px`, width:'1000px' }} />}
          mapElement={<div style={{ height: `1000px`, width:'1000px' }} />}
        />
        
        </div>
        
    )
};*/


import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
 
const containerStyle = {
  width: '1920px',
  height: '950px'
};
 
const center = {
  lat: 45.421532,
  lng: -75.697189
};
 
function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDm89aBFc66paInqWQOz8Z7OxPm79Xh6ws'
  })
 
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}
 
export default React.memo(MyComponent)