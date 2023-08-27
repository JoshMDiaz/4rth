import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Skinz' },
		{ name: 'description', content: 'Pickleball mixer, but better!' }
	]
}

export default function Index() {
	return (
		<div
			style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
		></div>
	)
}
