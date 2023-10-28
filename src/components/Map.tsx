import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoid21hbnRoIiwiYSI6ImNsbzlqbGllZjA1YXkya3BhNjAzYmYxZ3gifQ.NPZXRb-fA3jUXvzvuNsNxQ';

function Map() {
  const mapContainer = useRef<any>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [longitude, setLongitude] = useState(31.233333)
  const [latitude, setLatitude] = useState(121.466667)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [latitude, longitude],
      zoom: zoom
    })

    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    }))

    map.current.on('load', () => {
      console.log(process.env.PUBLIC_URL + '/geojson/features.json')

      map.current?.addSource('features', {
        type: 'geojson',
        data: process.env.PUBLIC_URL + '/geojson/features.json'
      })
      .addLayer({
        'id': 'ODD-layer',
        'type': 'line',
        'source': 'features',
        'paint': {
          'line-color': 'red',
          'line-width': 3
        },
        'filter': ['==', 'name', 'ODD']
      })
      .addLayer({
        'id': 'Divider-layer',
        'type': 'line',
        'source': 'features',
        'paint': {
          'line-color': 'blue',
          'line-width': 3
        },
        'filter': ['==', 'name', 'Divider']
      })
    })
  })

  return (
      <div ref={mapContainer} className="map-container" />
  );
}

export default Map;
