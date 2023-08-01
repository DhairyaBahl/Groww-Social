'use client'

import { fetchPostsAPI, fetchRandomPostsAPI } from "@/api";
import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import Error from "../atoms/Error";
import styles from "@/styles/molecules/NewsFeed.module.css"
import { handleCache } from "@/handlers";

interface NewsFeedProps {
    posts: any[]
    page: number
    setPage: any
    errorMessage: string
    isLoading: boolean
    isProfile?: boolean
}

/*
    This component is used to render the feed of posts on the home page
*/
export default function NewsFeed(props: NewsFeedProps) {
    let posts: any, setPosts:any;
    let page: number, setPage: any;
    let errorMessage: string, setErrorMessage: any;
    let isLoading: boolean, setIsLoading: any;

    if(!props.isProfile) {
        [posts, setPosts] = useState<any[]>([]);
        [page, setPage] = useState<number>(1);
        [errorMessage, setErrorMessage] = useState<string>('');
        [isLoading, setIsLoading] = useState<boolean>(true);
    }
    else {
        page = props.page;
        posts = props.posts;
        setPage = props.setPage;
        errorMessage = props.errorMessage;
        isLoading = props.isLoading;
    }

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

    useEffect(() => {
        if(props.isProfile) return;
        getPosts(10)
    }, props.isProfile ? [] : [page])

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
                onIntersect={() => setPage((page: number) => page + 1)}
                comments = {post.likes + index}
            />
        ))}
        <Error message={errorMessage} />
        </div>
    )
}