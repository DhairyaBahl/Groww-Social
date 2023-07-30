'use client'

import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import { cache } from "react"

export default function NewsFeed() {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState(1);

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

    useEffect(() => {
        getPosts(10);
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