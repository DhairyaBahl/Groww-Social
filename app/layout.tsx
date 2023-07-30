import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Main from '@/components/Main'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Feed',
  description: 'News Feed of Social',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
	<html lang="en">
    	<body className={inter.className}>
        <Header/>
        <Main>
          {children}
        </Main>
    	</body>
    </html>
  )
}
