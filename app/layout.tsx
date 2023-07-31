import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Main from '@/components/Main'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Groww Social',
  description: 'Social media for Growing Photographers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
	<html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
        <meta name="theme-color" content="#000" />
      </head>
    	<body>
        <Header/>
        <Main>
          {children}
        </Main>
    	</body>
    </html>
  )
}
