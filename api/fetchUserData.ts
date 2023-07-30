export async function fetchUserDataAPI(username: string) {
    const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    const baseUrl = `https://api.unsplash.com/users/${username}?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data;
}