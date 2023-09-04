import logo from '../images/logo-black.svg'
import MenuDrawer from './MenuDrawer'

const Header = (): JSX.Element => {
	return (
		<header>
			<MenuDrawer />
			<img height={70} src={logo} id='logo' />
			<div style={{ width: 40 }} />
		</header>
	)
}

export default Header
