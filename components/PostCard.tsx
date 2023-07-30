import Image from "next/image"
import styles from "@/styles/PostCard.module.css"
import { useEffect, useRef, useState } from "react"
import LikeButton from "@/components/LikeButton"
import Link from "next/link";
import { handleLike } from "@/helpers";

export default function PostCard(props: any) {
    const {
        alt_description,
        urls: { regular },
        user: { name, profile_image: { small }, username },
    } = props.post

    const {
        isLast,
        onIntersect,
    } = props

    const postCardRef = useRef(null);

    const [isLiked, setIsLiked] = useState(props?.post?.liked_by_user);
    const [likes, setLikes] = useState(props?.post?.likes);

    useEffect(() => {
        if(!postCardRef.current) return

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && isLast) {
                console.log('last post is visible')
                onIntersect()
                observer.unobserve(entry.target)
            }
        })

        observer.observe(postCardRef.current)
    }, [isLast])

    return (
        <div className={styles.pc786postCard} ref={postCardRef}>
            <div className={styles.pc786postCardHeader}>
                <Link href={`/user/${username}`} className={styles.pc786postCardHeaderLink}>
                    <Image 
                        src={small}
                        alt={name}
                        width={40}
                        height={40}
                        className={styles.pc786postCardHeaderImage}
                    />
                    <div className={styles.pc786postCardHeaderName}> { username } </div>
                </Link>
            </div>
            <div className={styles.pc786postCardContent}>
                <Image
                    src={regular}
                    alt={alt_description}
                    width={300}
                    height={400}
                    className={styles.pc786postCardImage}
                    onDoubleClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                    loading="lazy"
                />
            </div>
            <div className={styles.pc786postCardInteractions}>
                <LikeButton 
                    isLiked={isLiked} 
                    dimensions={32}
                    onClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                />
                <span className={styles.pc786postCardLikes}> { likes } likes</span>
            </div>
            <div className={styles.pc786postCardDescription}>
                { alt_description }
            </div>
        </div>
    )
}