import Image from "next/image"
import styles from "@/app/styles/GridCard.module.css"
import LikeButton from "./LikeButton"
import { useState } from "react"

export default function GridCard(props: any) {
    const [likes, setLikes] = useState<number>(props.post.likes)
    const [isLiked, setIsLiked] = useState<boolean>(props.post.liked_by_user)

    function handleLike() {
        if(isLiked) {
            setIsLiked(false)
            setLikes(likes - 1)
        }
        else {
            setIsLiked(true)
            setLikes(likes + 1)
        }
    }
    
    return (
        <div className={styles.gc786gridCard}>
            <Image
                src={props.post.urls?.regular}
                alt={props.post.alt_description}
                width={props.post.width}
                height={props.post.height}
                className={styles.gc786gridCardImage}
            />
            <div className={styles.gc786gridCardDescDescription}>
                {props.post.alt_description}
            </div>
            <div className={styles.gc786gridCardDescLikes}>
                <LikeButton 
                    post={props.post}
                    dimensions={36}
                    isLiked={isLiked}
                    className={styles.gc786likeButton}
                    onClick={handleLike}
                />
                <span className={styles.gc786value}>{likes}</span>
                <span>likes</span>
            </div>
        </div>
    )
}