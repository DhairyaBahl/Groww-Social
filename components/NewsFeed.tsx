'use client'

import { fetchPostsAPI, fetchRandomPostsAPI } from "@/api";
import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import Error from "./Error";

export default function NewsFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { username } = props

    async function getPosts(count: number) {
        let newPosts:any = localStorage.getItem('posts')
        if(!newPosts || Object.keys(newPosts).length === 0) {
            try {
                newPosts = await fetchRandomPostsAPI(count);
                localStorage.setItem('posts', JSON.stringify(newPosts))
            }
            catch({message}: any) {
                setErrorMessage(message)
                return;
            }
        }
        else {
            newPosts = JSON.parse(newPosts)
        }
        setPosts([...posts, ...newPosts])
    }

    async function fetchPosts(username: string) {
        let newPosts:any = localStorage.getItem(username + '-posts')
        if(!newPosts) {
            try {
                newPosts = await fetchPostsAPI(username)
                localStorage.setItem(username + '-posts', JSON.stringify(newPosts))
            }
            catch({message}: any) {
                setErrorMessage(message)
                return;
            }
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
        if(errorMessage.length) return <Error message={errorMessage} />
        else return <div>Loading...</div>
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
        <Error message={errorMessage} />
        </div>
    )
}