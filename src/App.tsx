import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Map from './components/Map'
import Menu from './components/Menu'
import { List } from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [show, setShow] = useState(false)
  const handleShow = () => { setShow(true) }
  const handleClose = () => { setShow(false) }

  return (
	<React.Fragment>
		<Button id='ABC' variant="light" onClick={ handleShow }>
			<List />
		</Button>
		<Offcanvas show={show} onHide={handleClose}>
		  <Offcanvas.Header closeButton>
			<Offcanvas.Title>Features</Offcanvas.Title>
		  </Offcanvas.Header>
		  <Offcanvas.Body>
			<Menu />		  
		  </Offcanvas.Body>
		</Offcanvas>
		<Map />
	</React.Fragment>
  )
}

export default App;
