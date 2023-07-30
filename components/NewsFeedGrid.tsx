import { useState, useEffect } from "react";
import styles from '@/styles/NewsFeedGrid.module.css'
import GridCard from "@/components/GridCard";
import { fetchPostsAPI } from "@/api/fetchPosts";
import Error from "./Error";

export default function NewsFeedGrid(props: any) {
    const { username } = props
    const [posts, setPosts] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Error Handling Krni hai
    async function fetchPosts() {
        let userPosts:any = localStorage.getItem(username + '-posts');
        if(!userPosts) {
            try {
                userPosts = await fetchPostsAPI(username);
                localStorage.setItem(username + '-posts', JSON.stringify(userPosts));
            }
            catch({message}: any) {
                setErrorMessage(message);
                return;
            }
        }
        else {
            userPosts = JSON.parse(userPosts);
        }
        setPosts(userPosts);
    }

    useEffect(() => { fetchPosts() }, [])

    // Loading Spinner Daalna hai
    if(!posts) {
        if(errorMessage.length) return <Error message={errorMessage} />
        else return <div>Loading...</div>
    }

    return (
        <div className={styles.nfg786newsFeedGrid}>
            {posts.map((post: any) => <GridCard key={post.id} post={post} />)}
            <Error message={errorMessage} />
        </div>
    )
}