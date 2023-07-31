import Image from "next/image"
import styles from "@/styles/GridCard.module.css"
import LikeButton from "@/components/LikeButton"
import { useState } from "react"
import { handleLike } from "@/helpers"

export default function GridCard(props: any) {
    const [likes, setLikes] = useState<number>(props.post.likes)
    const [isLiked, setIsLiked] = useState<boolean>(props.post.liked_by_user)
    
    return (
        <div className={styles.gc786gridCard}>
            <Image
                src={props.post.urls?.regular}
                alt={props.post.alt_description}
                width={props.post.width}
                height={props.post.height}
                className={styles.gc786gridCardImage}
                loading="lazy"
                placeholder="blur"
                blurDataURL={props.post.blur_hash}
            />
            <div className={styles.gc786gridCardDescDescription}>
                {
                    props.post.alt_description ? 
                    props.post.alt_description :
                    "..."
                }
            </div>
            <div className={styles.gc786gridCardDescLikes}>
                <LikeButton 
                    post={props.post}
                    dimensions={36}
                    isLiked={isLiked}
                    className={styles.gc786likeButton}
                    onClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                />
                <span className={styles.gc786value}>{likes}</span>
                <span>likes</span>
            </div>
        </div>
    )
}