import { Form } from 'react-bootstrap'

export type Handler = (isActive: boolean) => void

export type MenuItem = {
	name: string
	checked: boolean
	handler: Handler
}

export type MenuProps = {
	items: MenuItem[]
}

export default function Menu(props: MenuProps) {

	return (
		<Form> { props.items.map(item => <Form.Check
			key={ item.name }
			type='switch'
			checked = { item.checked }
			id={ item.name }
			label={ item.name }
			onChange={ (event: any) => { item.handler(event.target.checked) } } />
		)}
		</Form>
	)
}
