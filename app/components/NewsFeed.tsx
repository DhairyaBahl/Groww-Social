'use client'

import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import { cache } from "react"

export default function NewsFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState(1);

    const { username } = props

    async function getPosts(count: number) {
        if(!localStorage.getItem('posts')) {
            const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=${count}`, {
                headers: { 
                    'Accept-Version': 'v1'
                },
                next: { revalidate: 3600 },
            })
        
            const data = await response.json()
            localStorage.setItem('posts', JSON.stringify(data))
        }
    
        const newPosts = JSON.parse(localStorage.getItem('posts') || '')
        setPosts([...posts, ...newPosts])
    }

    async function fetchPosts(username: string) {
        if(localStorage.getItem(username + '-posts') === null) {
            console.log('cache miss')
            const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
            const baseUrl = `https://api.unsplash.com/users/${username}/photos?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            const response = await fetch(baseUrl)
            const data = await response.json()
            localStorage.setItem(username + '-posts', JSON.stringify(data))
        }

        const newPosts = JSON.parse(localStorage.getItem(username + '-posts') || '{}')
        setPosts([...posts, ...newPosts])
    }

    useEffect(() => {
        if(username) fetchPosts(username)
        else getPosts(10);
    }, [page])

    if(!posts.length) {
        // TODO: Add a loading spinner
        return <div>Loading...</div>
    }
    
    return (
        <div>
        {posts.map((post: any, index:number) => (
            <PostCard 
                key={index} 
                post={post}
                isLast = {index === posts.length - 1}
                onIntersect={() => setPage((page) => page + 1)}
            />
        ))}
        </div>
    )
}