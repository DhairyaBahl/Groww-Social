import styles from '@/styles/SuggestedProfiles.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function SuggestedProfiles() {
    const profiles = [
        {
            username: 'neom',
            avatar: 'https://images.unsplash.com/profile-1679489218992-ebe823c797dfimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff'
        },
        {
            username: 'frostroomhead',
            avatar: 'https://images.unsplash.com/profile-1643890336343-094f0309d97cimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff'
        },
        {
            username: 'patrycjajadach',
            avatar: 'https://images.unsplash.com/profile-1689248694184-0ec62b6f54ebimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff'
        },
        {
            username: 'mailchimp',
            avatar: 'https://images.unsplash.com/profile-1609545740442-928866556c38image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff'
        }
    ];

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