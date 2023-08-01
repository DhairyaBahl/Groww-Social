import { useEffect, useState } from "react"
import NewsFeed from "./NewsFeed"
import NewsFeedGrid from "./NewsFeedGrid"
import { handleCache } from "@/handlers"
import { fetchPostsAPI } from "@/api"

interface ProfilePostsProps {
    username: string
    isGrid: boolean
}

export default function ProfilePosts(props: ProfilePostsProps) {
    const { username, isGrid } = props

    const [posts, setPosts] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchPosts() {
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
        fetchPosts();
    }, [page])

    const childProps = {
        posts,
        setPage,
        errorMessage,
        isLoading,
    }

    if(isGrid) return <NewsFeedGrid {...childProps} />
    else return <NewsFeed {...childProps} isProfile page={page}/>
}