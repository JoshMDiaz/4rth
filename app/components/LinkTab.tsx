import { Tab } from '@mui/material'
import React from 'react'

type LinkTabProps = {
  label: string
  href: string
  //   index: number
}

const LinkTab = (props: LinkTabProps): JSX.Element => {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

export default LinkTab
