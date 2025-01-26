'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DrawerHeaderProps {
  closeDrawer: () => void
}

const DrawerHeader = ({ closeDrawer }: DrawerHeaderProps) => {
  return (
    <div className='flex justify-between items-center gap-4 p-4 border-b-2 border-gray-300'>
      <h2 className='m-0'>Menu</h2>
      <Button variant='ghost' size='icon' onClick={closeDrawer}>
        <X className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default DrawerHeader
