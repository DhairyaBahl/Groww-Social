'use client';

import { fetchPostByIDAPI } from "@/api";
import Error from "@/components/Error";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function PostPage({ params } : { params: { postId: string } }) {
    const [postData, setPostData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchPost() {
        setIsLoading(true);
        let post = localStorage.getItem(params.postId);
        if(!post) {
            try {
                post = await fetchPostByIDAPI(params.postId);
                localStorage.setItem(params.postId, JSON.stringify(post));
            }
            catch({message}: any) {
                setErrorMessage(message);
                setIsLoading(false);
                return;
            }
        }
        else {
            post = JSON.parse(post);
        }
        setPostData(post);
        setIsLoading(false);
    }

    useEffect(() => { fetchPost() }, [])

    if(isLoading) return <div>Loading...</div>
    else if(errorMessage.length) return <Error message={errorMessage} />
    else if(!postData) return <div>No Post Found</div>

    return <PostCard post={postData} isGrid={false} />
}