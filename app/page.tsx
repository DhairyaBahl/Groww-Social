import styles from './page.module.css'
import NewsFeed from '@/components/NewsFeed'
import SuggestedProfiles from '@/components/SuggestedProfiles'

export default function Home() {
	return (
		<div className = {styles.Home786}>
			<NewsFeed />
			<SuggestedProfiles />
		</div>
	)
}