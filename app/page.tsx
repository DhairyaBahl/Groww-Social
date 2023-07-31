import { Inter } from 'next/font/google'
import styles from './page.module.css'
import NewsFeed from '@/components/NewsFeed'
import SuggestedProfiles from '@/components/SuggestedProfiles'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<div className = {styles.Home786}>
			<NewsFeed />
			{/* <SuggestedProfiles /> */}
		</div>
	)
}