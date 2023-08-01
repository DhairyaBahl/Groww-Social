interface IPost {
    alt_description: string;
    urls: {
        regular: string;
    }
    user: {
        name: string;
        profile_image: {
            small: string;
        }
        username: string;
    }
    liked_by_user: boolean;
    likes: number;
    id: string;
    blur_hash: string;
    width: string;
    height: string;
    created_at: string;
}

export default IPost;