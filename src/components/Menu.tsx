import { useState } from 'react'
import { Form } from 'react-bootstrap'
import './Menu.css'

function Menu() {
	const [showODD, setShowODD] = useState(true)
	const [showDivider, setShowDivider] = useState(false)

	const handleODDChanged = (e: any) => {
		setShowODD(e.target.checked)
	}

	const handleDividerChanged = (e: any) => {
		setShowDivider(e.target.checked)
	}

	return (
		<Form>
			<Form.Check
				type="switch"
				id="ODD"
				checked={ showODD }
				label="ODD"
				onChange={ handleODDChanged }/>
			<Form.Check
				type="switch"
				id="Divider"
				label='Divider'
				checked = { showDivider }
				onChange={ handleDividerChanged }/>
		</Form>
	)
}

export default Menu
