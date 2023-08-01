import { fetchSuggestedProfilesAPI } from '@/api';
import styles from '@/styles/atoms/SuggestedProfiles.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function SuggestedProfiles() {
    const profiles = fetchSuggestedProfilesAPI();

    return (
        <div className={styles.sp786container}>
            <div className={styles.sp786title}>Suggested Profiles</div>
            {profiles.map((profile, index) => (
                <Link
                    href={`/user/${profile.username}`}
                    key={index} 
                    className={styles.sp786profile}
                >
                    <Image 
                        src={profile.avatar} 
                        alt="avatar" 
                        className={styles.sp786avatar}
                        width={40}
                        height={40}
                    />
                    <div className={styles.sp786username}>{profile.username}</div>
                </Link>
            ))}
        </div>
    )
}