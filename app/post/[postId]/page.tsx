'use client';

import { fetchPostByIDAPI } from "@/api";
import Error from "@/components/atoms/Error";
import PostCard from "@/components/molecules/PostCard";
import { handleCache } from "@/handlers";
import { useEffect, useState } from "react";

interface PostPageProps {
    params: {
        postId: string
    }
}

/*
    This Page is used to render individual post when user clicks on a post
    from the profile page in the grid view
*/
export default function PostPage(props: PostPageProps) {
    const [postData, setPostData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { params } = props;

    async function fetchPost() {
        setIsLoading(true);
        let post = handleCache().getCache('post:' + params.postId);;
        if(!post) {
            try {
                post = await fetchPostByIDAPI(params.postId);
                handleCache().setCache({
                    key: 'post:' + params.postId,
                    value: post,
                    expiration: 3600
                });
            }
            catch({message}: any) {
                setErrorMessage(message);
                setIsLoading(false);
                return;
            }
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