import { useState, useEffect } from "react";
import styles from '@/styles/NewsFeedGrid.module.css'
import GridCard from "@/components/GridCard";
import { fetchPostsAPI } from "@/api/fetchPosts";
import Error from "./Error";
import PostCard from "./PostCard";

export default function NewsFeedGrid(props: any) {
    const { username } = props
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchPosts() {
        setIsLoading(true);
        let userPosts:any = localStorage.getItem(username + '-posts');
        if(!userPosts) {
            try {
                userPosts = await fetchPostsAPI(username);
                localStorage.setItem(username + '-posts', JSON.stringify(userPosts));
            }
            catch({message}: any) {
                setErrorMessage(message);
                setIsLoading(false);
                return;
            }
        }
        else {
            userPosts = JSON.parse(userPosts);
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