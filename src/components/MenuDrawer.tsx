'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import dynamic from 'next/dynamic'
import { usePlayers } from '@/hooks/usePlayers'

// Dynamically import AlertDialog with no SSR
const ClearDataDialog = dynamic(() => import('@/components/ClearDataDialog'), {
  ssr: false,
})

const MenuDrawer = (): JSX.Element => {
  const [, updatePlayers] = usePlayers()
  const [isOpen, setIsOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleClearData = () => {
    localStorage.clear()
    router.push('/')
    updatePlayers([])
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent className='bg-white'>
          <div className='py-4'>
            <Button
              variant='ghost'
              className='w-full justify-start px-6 py-2'
              onClick={() => setIsDialogOpen(true)}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Clear Player Data
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <ClearDataDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={() => {
          handleClearData()
          setIsDialogOpen(false)
          setIsOpen(false)
        }}
      />
    </>
  )
}

export default MenuDrawer
