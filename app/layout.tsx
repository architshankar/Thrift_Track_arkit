import type { Metadata } from 'next'
import { Inter,Space_Grotesk } from 'next/font/google'
import './styles.css'
import Navbar from '@/Components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk= Space_Grotesk({
  subsets: ['latin'],weight:['300','400','500','600','700'] })

export const metadata: Metadata = {
  title: 'Thrift Track',
  description: 'is the ultimate price tracking tool! Track prices, get instant alerts, and find the best deals on your favorite products. Shop smarter and save money effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10x1 mx-auto">
          <Navbar />
         {children}
        </main>
        </body>
    </html> 
  )
}
