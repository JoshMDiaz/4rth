import { IconButton } from '@mui/material'
import '../styles/drawer-header.css'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'

type DrawerHeaderProps = {
	closeDrawer: () => void
}

const DrawerHeader = ({ closeDrawer }: DrawerHeaderProps): JSX.Element => {
	return (
		<div className='drawer-header'>
			<IconButton onClick={closeDrawer} className='collapse-button'>
				<ExpandCircleDownOutlinedIcon />
			</IconButton>
		</div>
	)
}

export default DrawerHeader
