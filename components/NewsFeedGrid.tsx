import { useState, useEffect } from "react";
import styles from '@/styles/NewsFeedGrid.module.css'
import GridCard from "@/components/GridCard";
import { fetchPostsAPI } from "@/api/fetchPosts";

export default function NewsFeedGrid(props: any) {
    const { username } = props
    const [posts, setPosts] = useState<any[]>([]);

    const [isError, setIsError] = useState<boolean>(false);

    // Error Handling Krni hai
    async function fetchPosts() {
        let userPosts:any = localStorage.getItem(username + '-posts');
        if(!userPosts) {
            userPosts = await fetchPostsAPI(username);
            localStorage.setItem(username + '-posts', JSON.stringify(userPosts));
        }
        else {
            userPosts = JSON.parse(userPosts);
        }
        setPosts(userPosts);
    }

    useEffect(() => { fetchPosts() }, [])

    // Loading Spinner Daalna hai
    if(!posts) return <div>loading...</div>

    return (
        <div className={styles.nfg786newsFeedGrid}>
            {posts.map((post: any) => <GridCard key={post.id} post={post} />)}
        </div>
    )
}