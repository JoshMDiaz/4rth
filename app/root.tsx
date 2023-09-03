import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigate
} from '@remix-run/react'
import Nav from './components/Nav'
import logo from './images/logo-black.svg'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'
import { useState } from 'react'

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
]

export default function App() {
	const navigate = useNavigate(),
		[isDialogOpen, setIsDialogOpen] = useState(false)

	const handleClearData = () => {
		localStorage.clear()
		navigate('/')
	}

	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<div className='app-container'>
					<header>
						<div />
						<img height={70} src={logo} id='logo' />
						<Button
							variant='text'
							color='error'
							onClick={() => setIsDialogOpen(true)}
						>
							New Players
						</Button>
						<Dialog open={isDialogOpen}>
							<DialogTitle>Are you sure?</DialogTitle>
							<DialogContent>
								<DialogContentText>
									This will erase all of the player data for this session.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button
									variant='text'
									color='secondary'
									onClick={() => setIsDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button
									variant='text'
									color='primary'
									onClick={() => {
										handleClearData()
										setIsDialogOpen(false)
									}}
								>
									Confirm
								</Button>
							</DialogActions>
						</Dialog>
					</header>
					<div className='content-container'>
						<Outlet />
					</div>
					<Nav />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
