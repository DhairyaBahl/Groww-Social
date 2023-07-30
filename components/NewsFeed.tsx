'use client'

import { fetchPostsAPI, fetchRandomPostsAPI } from "@/api";
import PostCard from "./PostCard"
import { useEffect, useState } from "react"

export default function NewsFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState(1);

    const { username } = props

    async function getPosts(count: number) {
        let newPosts:any = localStorage.getItem('posts')
        if(!newPosts) {
            newPosts = await fetchRandomPostsAPI(count);
            localStorage.setItem('posts', JSON.stringify(newPosts))
        }
        else {
            newPosts = JSON.parse(newPosts)
        }
        setPosts([...posts, ...newPosts])
    }

    async function fetchPosts(username: string) {
        let newPosts:any = localStorage.getItem(username + '-posts')
        if(!newPosts) {
            newPosts = await fetchPostsAPI(username)
            localStorage.setItem(username + '-posts', JSON.stringify(newPosts))
        }
        else {
            newPosts = JSON.parse(newPosts)
        }
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