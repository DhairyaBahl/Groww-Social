import { useState, useEffect } from "react";
import styles from '@/styles/molecules/NewsFeedGrid.module.css';
import { fetchPostsAPI } from "@/api/fetchPosts";
import Error from "../atoms/Error";
import PostCard from "./PostCard";
import { handleCache } from "@/handlers";

interface NewsFeedGridProps {
    posts: any[]
    setPage: any
    errorMessage: string
    isLoading: boolean
}

/*
    This component is used to render the grid of posts on the profile page
*/
export default function NewsFeedGrid(props: NewsFeedGridProps) {
    const { posts, setPage, errorMessage, isLoading } = props

    if(isLoading) return <div>Loading...</div>
    else if(errorMessage.length) return <Error message={errorMessage} />
    else if(!posts.length) return <div>No Posts</div>

    return (
        <div className={styles.nfg786newsFeedGrid}>
            {posts.map((post: any, index: number) => (
                <PostCard
                    key={index}
                    post={post}  
                    isLast={index === posts.length - 1}
                    onIntersect={() => setPage((page: number) => page + 1)}
                    isGrid={true}
                />
            ))}
            <Error message={errorMessage} />
        </div>
    )
}