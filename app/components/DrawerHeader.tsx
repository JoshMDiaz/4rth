import { IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import '../styles/drawer-header.css'

type DrawerHeaderProps = {
	title: string
	closeDrawer: () => void
}

const DrawerHeader = ({
	title,
	closeDrawer
}: DrawerHeaderProps): JSX.Element => {
	return (
		<div className='drawer-header'>
			<h2>{title}</h2>
			<IconButton onClick={closeDrawer}>
				<CloseOutlinedIcon />
			</IconButton>
		</div>
	)
}

export default DrawerHeader
