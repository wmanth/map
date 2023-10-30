import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import layers from '../layers.json'

mapboxgl.accessToken = 'pk.eyJ1Ijoid21hbnRoIiwiYSI6ImNsbzlqbGllZjA1YXkya3BhNjAzYmYxZ3gifQ.NPZXRb-fA3jUXvzvuNsNxQ'

type MapProps = {
	visibleLayers: Set<string>
}

export default function Map(props: MapProps) {
	const mapContainer = useRef<any>(null)
	const mapRef = useRef<mapboxgl.Map | null>(null)

	const [initialized, setInitialized] = useState(false)
	const [latitude, setLatitude] = useState(121.466667)
	const [longitude, setLongitude] = useState(31.233333)

	useEffect(() => {
		if (mapRef.current) return

		navigator.geolocation.getCurrentPosition(position => {
			setLatitude(position.coords.latitude)
			setLongitude(position.coords.longitude)
		})

		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [latitude, longitude],
			zoom: 9
		})

		const map = mapRef.current

		map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			// When active the map will receive updates to the device's location as it changes.
			trackUserLocation: true,
			// Draw an arrow next to the location dot to indicate which direction the device is heading.
			showUserHeading: true
		}))

		map.on('load', () => {
			map.addSource('features', {
				type: 'geojson',
				data: process.env.PUBLIC_URL + '/geojson/features.json'
			})

			layers.forEach(item => {
				if (props.visibleLayers.has(item.layer.id)) {
					map.addLayer(item.layer as mapboxgl.AnyLayer)
				}
			})
			setInitialized(true)
		})
	})

	useEffect(() => {
		if (!mapRef.current || !initialized) return
		const map = mapRef.current

		// update visible layers based on user settings
		layers.forEach(item => {
			if (props.visibleLayers.has(item.layer.id) && !map.getLayer(item.layer.id)) {
				map.addLayer(item.layer as mapboxgl.AnyLayer)
			} else
			if (!props.visibleLayers.has(item.layer.id) && map.getLayer(item.layer.id)) {
				map.removeLayer(item.layer.id)
			}
		})
	}, [initialized, props])

	return <div ref={mapContainer} className="map-container" />
}
