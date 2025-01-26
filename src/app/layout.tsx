import './globals.css'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: '4RTH',
  description: 'Pickleball mixer, but better!',
}

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <div className='app-container'>
          <Header />
          <main className='content-container'>{children}</main>
          <Nav />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
