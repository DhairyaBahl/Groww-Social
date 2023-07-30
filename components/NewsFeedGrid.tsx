import { useState, useEffect } from "react";
import styles from '@/styles/NewsFeedGrid.module.css'
import GridCard from "@/components/GridCard";

export default function NewsFeedGrid(props: any) {
    const { username } = props
    const [posts, setPosts] = useState<any>([]);

    async function fetchPosts(username: string) {
        if(localStorage.getItem(username + '-posts') === null) {
            console.log('cache miss')
            const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
            const baseUrl = `https://api.unsplash.com/users/${username}/photos?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            const response = await fetch(baseUrl)
            const data = await response.json()
            localStorage.setItem(username + '-posts', JSON.stringify(data))
        }

        const posts = JSON.parse(localStorage.getItem(username + '-posts') || '{}')
        setPosts(posts)
    }

    useEffect(() => {
        fetchPosts(username);
    }, [])

    if(!posts) return <div>loading...</div>

    return (
        <div className={styles.nfg786newsFeedGrid}>
            {posts.map((post: any) => <GridCard key={post.id} post={post} />)}
        </div>
    )
}