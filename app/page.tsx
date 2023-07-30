import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Header from './components/Header'
import NewsFeed from './components/NewsFeed'
// import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<div className = {styles.Home786}>
			<NewsFeed />
		</div>
	)
}