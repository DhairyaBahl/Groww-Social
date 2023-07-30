export async function fetchPostsAPI(username: string) {
    const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    // try {
        const baseUrl = `https://api.unsplash.com/users/${username}/photos?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        const response = await fetch(baseUrl)
        const data = await response.json()
        return data
    // }
    // catch (error) {
    //     return error
    // }
}