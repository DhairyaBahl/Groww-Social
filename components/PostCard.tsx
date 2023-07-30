import Image from "next/image"
import styles from "@/styles/PostCard.module.css"
import { useEffect, useRef, useState } from "react"
import LikeButton from "@/components/LikeButton"
import Link from "next/link";

const NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = '6Vdw8-3ariO7u6aPjxLXzhykKl6eTVdYKdj2dKZXEKA'

export default function PostCard(props: any) {
    const {
        id,
        alt_description,
        urls: { regular },
        user: { name, profile_image: { medium }, id: user_id, username },
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

    async function handleLike(event: any) {
        const baseUrl = `https://api.unsplash.com/photos/${id}/like?client_id=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        const method = isLiked ? 'DELETE' : 'POST'

        if(isLiked) {
            setIsLiked(false)
            setLikes(likes - 1)
        }
        else {
            setIsLiked(true)
            setLikes(likes + 1)
        }

        const response = await fetch(baseUrl, {
            method,
            headers: {
                'Accept-Version': 'v1'
            },
        })
    }

    return (
        <div className={styles.pc786postCard} ref={postCardRef}>
            <div className={styles.pc786postCardHeader}>
                <Link href={`/user/${username}`} className={styles.pc786postCardHeaderLink}>
                    <Image 
                        src={medium}
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
                    onDoubleClick={handleLike}
                    loading="lazy"
                />
            </div>
            <div className={styles.pc786postCardInteractions}>
                <LikeButton 
                    isLiked={isLiked} 
                    dimensions={32}
                    onClick={handleLike}
                />
                <span className={styles.pc786postCardLikes}> { likes } likes</span>
            </div>
            <div className={styles.pc786postCardDescription}>
                { alt_description }
            </div>
        </div>
    )
}