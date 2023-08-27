import './globals.css'
import type { Metadata } from 'next'
import {Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taxi Booking',
  description: 'This is Taxi Booking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Navbar/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
