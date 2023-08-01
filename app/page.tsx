import styles from '@/styles/pages/HomePage.module.css'
import NewsFeed from '@/components/molecules/NewsFeed'
import SuggestedProfiles from '@/components/atoms/SuggestedProfiles'

export default function Home() {
	return (
		<div className = {styles.Home786}>
			<NewsFeed />
			<SuggestedProfiles />
		</div>
	)
}