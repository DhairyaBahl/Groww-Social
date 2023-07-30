export function handleLike(data: any) {
    const { isLiked, setIsLiked, setLikes}  = data;
    
    if (isLiked) {
        setIsLiked(false);
        setLikes((prev: number) => prev - 1);
    }
    else {
        setIsLiked(true);
        setLikes((prev: number) => prev + 1);
    }
}