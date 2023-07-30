'use client'

import styles from "@/app/styles/UserPage.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import NewsFeedGrid from "@/app/components/NewsFeedGrid"
import NewsFeed from '@/app/components/NewsFeed'

export default function UserPage({ params } : { params: { username: string } }) {
    const username = params.username
    const [userData, setUserData] = useState<any>(null);
    const [isGrid, setIsGrid] = useState<boolean>(true);

    function handleData(data: any) {
        if(data.bio) data.bio = data.bio.substr(1, data.bio.length - 1)
        else data.bio = 'No bio'
    }

    async function fetchUserData(username: string) {
        if(localStorage.getItem(username) === null) {
            console.log('cache miss')
            const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
            const baseUrl = `https://api.unsplash.com/users/${username}?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            const response = await fetch(baseUrl)
            const data = await response.json()
            localStorage.setItem(username, JSON.stringify(data))
        }
        else {
            console.log('cache hit')
        }

        const userData = JSON.parse(localStorage.getItem(username) || '{}')
        handleData(userData)
        setUserData(userData)
        // console.log(userData)

    }

    useEffect(() => {
        fetchUserData(username);
    }, [])

    if(!userData) return <div>loading...</div>
    
    return (
        <div className={styles.up786userPage}>
            <div className={styles.up786userInfo}>
                <Image
                    src={userData.profile_image?.large}
                    alt="Picture of the user"
                    width={100}
                    height={100}
                    className={styles.up786userAvatar}
                    priority={true}
                />
                <div className={styles.up786userDetailsWrapper}>
                    <div className={styles.up786userName}>{username}</div>
                    <div className={styles.up786userDetails}>
                        <div className={styles.up786userPostCount}>
                            <span className={styles.up786value}>{userData.total_photos}</span>
                            <span>posts</span>
                        </div>
                        <div className={styles.up786userFollowersCount}>
                            <span className={styles.up786value}>{userData.followers_count}</span>
                            <span>followers</span>
                        </div>
                        <div className={styles.up786userFollowingCount}>
                            <span className={styles.up786value}>{userData.following_count}</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div className={styles.up786userFullName}>{userData.name}</div>
                    <div className={styles.up786bioHeading}>Bio</div>
                    <div className={styles.up786userBio}>{userData.bio}</div>
                </div>
            </div>
            <div className={styles.up786userPhotosFormat}>
                <span 
                    className = {`${styles.up786format} ${isGrid && styles.up786formatEnabled}`}
                    onClick={() => setIsGrid(true)}
                >Grid</span>
                <span 
                    className = {`${styles.up786format} ${!isGrid && styles.up786formatEnabled}`}
                    onClick={() => setIsGrid(false)}
                >List</span>
            </div>
            {isGrid && <NewsFeedGrid username = {username} />}
            {!isGrid && <NewsFeed username = {username} />}
        </div>
    )
}