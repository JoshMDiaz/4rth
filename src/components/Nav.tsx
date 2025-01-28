'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Users, Infinity, CheckSquare } from 'lucide-react'

const Nav = (): React.JSX.Element => {
  const pathname = usePathname()
  const router = useRouter()
  const pageName = pathname.split('/')[1]
  const [value, setValue] = useState(pageName)

  const navChange = (name: string) => {
    router.push(`/${name}`)
    setValue(name)
  }

  useEffect(() => {
    setValue(pageName)
  }, [pageName])

  return (
    <nav className='h-16 fixed bottom-0 left-0 right-0 border-t bg-white'>
      <div className='flex h-16 items-center justify-center max-w-sm mx-auto'>
        {[
          { name: 'players', Icon: Users },
          { name: 'matchups', Icon: Infinity },
          { name: 'standings', Icon: CheckSquare },
        ].map(({ name, Icon }) => (
          <button
            key={name}
            onClick={() => navChange(name)}
            className={`flex flex-col items-center gap-1 px-8 ${
              value === name ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className='h-5 w-5' />
            <span className='text-xs capitalize'>{name}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Nav
