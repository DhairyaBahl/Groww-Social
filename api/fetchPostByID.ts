import { handleError } from "@/handlers";

export async function fetchPostByIDAPI(postId: string) {
    const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    try {
        const baseUrl = `https://api.unsplash.com/photos/${postId}?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        const response = await fetch(baseUrl);

        const statusCode = response.status

        if(statusCode >= 400) {
            throw handleError(statusCode);
        }

        const data = await response.json()
        return data
    }
    catch (error) {
        throw error;
    }
}