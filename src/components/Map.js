import React from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, Marker, withGoogleMap, DirectionsRenderer } from "react-google-maps"

const Map = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  >
    {props.children}
  </GoogleMap>
);

Map.propTypes = {
  directions: PropTypes.object
};

export default Map;
