'use client'

import Image from 'next/image'
import MenuDrawer from '@/components/MenuDrawer'

const Header = (): React.JSX.Element => {
  return (
    <header className='flex items-center justify-between p-2'>
      <div className='w-10' />
      <Image
        src='/4rth-logo-horizontal.svg'
        alt='4RTH Logo'
        width={100}
        height={50}
        priority
        className='mx-auto'
      />
      <MenuDrawer />
    </header>
  )
}

export default Header
