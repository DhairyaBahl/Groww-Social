'use client'

import styles from "@/styles/pages/UserPage.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import NewsFeedGrid from "@/components/molecules/NewsFeedGrid"
import NewsFeed from '@/components/molecules/NewsFeed'
import { fetchUserDataAPI } from "@/api";
import { handleBio, handleCache } from "@/handlers";
import Error from "@/components/atoms/Error";

interface UserPageProps {
    params: {
        username: string
    }
}

export default function UserPage(props: UserPageProps) {
    const { params } = props;
    const username = params.username
    const [userData, setUserData] = useState<any>(null);
    const [isGrid, setIsGrid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchUserData(username: string) {
        setIsLoading(true)
        let userData: any = handleCache().getCache('user:' + username);

        if(!userData || Object.keys(userData).length === 0) {
            try {
                userData = await fetchUserDataAPI(username)
                handleCache().setCache({
                    key: 'user:' + username,
                    value: userData,
                    expiration: 3600
                });
            }
            catch({message}: any) {
                setIsLoading(false)
                setErrorMessage(message)
                return;
            }
        }

        userData.bio = handleBio(userData.bio)
        setUserData(userData)
        setIsLoading(false)
    }

    useEffect(() => { fetchUserData(username) }, [])
    
    if(isLoading) return <div>Loading...</div>
    else if(errorMessage.length) return <Error message={errorMessage} />
    else if(!userData || Object.keys(userData).length === 0) return <Error message="User not found" />
    
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
                    <div className={styles.up786userName}>@{username}</div>
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