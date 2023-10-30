import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Map from './components/Map'
import Menu, { MenuItem } from './components/Menu'
import { List } from 'react-bootstrap-icons'
import layers from './layers.json'
import './App.scss'

export default function App() {
 	const [isSidebarVisible, setSidebarVisible] = useState(false)
	const openSidebar = () => { setSidebarVisible(true) }
	const closeSidebar = () => { setSidebarVisible(false) }

	const [visibleLayers, setVisibleLayers] = useState(new Set<string>(layers.map(item => item.layer.id)))

	const menuItems: MenuItem[] = layers.map(item => {
		return {
			name: item.name,
			checked: visibleLayers.has(item.layer.id),
			handler: (isActive: boolean) => {
				console.log(`switching ${item.name} ${isActive ? 'on' : 'off'}`)
				const layers = new Set(visibleLayers)
				if (isActive) {
					layers.add(item.layer.id)
				} else {
					layers.delete(item.layer.id)
				}
				setVisibleLayers(layers)
			}
		}
	})

	return (
		<React.Fragment>
			<Button id='menu-button' variant="light" onClick={ openSidebar }>
				<List />
			</Button>
			<Offcanvas show={ isSidebarVisible } onHide={ closeSidebar }>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Features</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Menu items={ menuItems }/>
			</Offcanvas.Body>
			</Offcanvas>
			<Map visibleLayers={ visibleLayers }/>
		</React.Fragment>
	)
}
