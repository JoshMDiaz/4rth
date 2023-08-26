import type { V2_MetaFunction } from '@remix-run/node'
import { useState } from 'react'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Skinz' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
    ></div>
  )
}
