'use client'

import { fetchPostsAPI, fetchRandomPostsAPI } from "@/api";
import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import Error from "../atoms/Error";
import styles from "@/styles/molecules/NewsFeed.module.css"
import { handleCache } from "@/handlers";

export default function NewsFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { username } = props

    async function getPosts(count: number) {
        setIsLoading(true)
        let newPosts:any = handleCache().getCache('feedPosts');
        if(!newPosts || Object.keys(newPosts).length === 0) {
            try {
                newPosts = await fetchRandomPostsAPI(count);
                handleCache().setCache({
                    key: 'feedPosts',
                    value: newPosts,
                    expiration: 3600
                });
            }
            catch({message}: any) {
                setIsLoading(false)
                setErrorMessage(message)
                return;
            }
        }
        setIsLoading(false)
        setPosts([...posts, ...newPosts])
    }

    async function fetchPosts(username: string) {
        setIsLoading(true)
        let newPosts:any = handleCache().getCache(username + ':posts');
        if(!newPosts || Object.keys(newPosts).length === 0) {
            try {
                newPosts = await fetchPostsAPI(username);
                handleCache().setCache({
                    key: username + ':posts',
                    value: newPosts,
                    expiration: 3600
                });
            }
            catch({message}: any) {
                setIsLoading(false)
                setErrorMessage(message)
                return;
            }
        }
        setPosts([...posts, ...newPosts])
        setIsLoading(false)
    }

    useEffect(() => {
        if(username) fetchPosts(username)
        else getPosts(10);
    }, [page])

    if(isLoading) return <div>Loading...</div>
    else if(errorMessage.length) return <Error message={errorMessage} />
    else if(!posts.length) return <div>No Posts</div>
    
    return (
        <div className={styles.nf786NewsFeed}>
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