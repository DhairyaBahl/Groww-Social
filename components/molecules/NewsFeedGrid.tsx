import { useState, useEffect } from "react";
import styles from '@/styles/molecules/NewsFeedGrid.module.css';
import { fetchPostsAPI } from "@/api/fetchPosts";
import Error from "../atoms/Error";
import PostCard from "./PostCard";
import { handleCache } from "@/handlers";

interface NewsFeedGridProps {
    username: string
}

export default function NewsFeedGrid(props: NewsFeedGridProps) {
    const { username } = props
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchPosts() {
        setIsLoading(true);
        let userPosts:any = handleCache().getCache(username + ':posts');
        if(!userPosts) {
            try {
                userPosts = await fetchPostsAPI(username);
                handleCache().setCache({
                    key: username + ':posts',
                    value: userPosts,
                    expiration: 3600
                });
            }
            catch({message}: any) {
                setErrorMessage(message);
                setIsLoading(false);
                return;
            }
        }
        setPosts([...posts, ...userPosts]);
        setIsLoading(false);
    }

    useEffect(() => { fetchPosts() }, [page])

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
                    onIntersect={() => setPage((page) => page + 1)}
                    isGrid={true}
                />
            ))}
            <Error message={errorMessage} />
        </div>
    )
}