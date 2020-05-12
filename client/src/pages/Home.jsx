import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidGVyb2QiLCJhIjoiY2thMmFibG41MDE1dTNnbXNkcTZpanc4byJ9.s_CalO0PpT_z1JwmmJkL9Q'
});

class Home extends React.Component {
  // Implement react map box here.

  

  render() {
    return (
      <div>
        <Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>
</Map>
      </div>
    );
  }
}

export default Home;
