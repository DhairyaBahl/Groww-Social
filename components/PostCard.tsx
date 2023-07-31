import Image from "next/image"
import styles from "@/styles/PostCard.module.css"
import { useEffect, useRef, useState } from "react"
import LikeButton from "@/components/LikeButton"
import Link from "next/link";
import { handleDate, handleLike } from "@/helpers";
import useNextBlurHash from 'use-next-blurhash'

export default function PostCard(props: any) {
    const {
        alt_description,
        urls: { regular },
        user: { name, profile_image: { small }, username },

    } = props.post

    const {
        isLast,
        onIntersect,
        isGrid
    } = props

    const postCardRef = useRef(null);

    const [isLiked, setIsLiked] = useState(props?.post?.liked_by_user);
    const [likes, setLikes] = useState(props?.post?.likes);

    const [blurDataUrl] = useNextBlurHash(props?.post?.blur_hash);
    console.log('blurDataUrl', blurDataUrl)

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
    }, [isLast]);

    if(isGrid)
    return (
        <Link
            href={`/post/${props.post.id}`} 
            className={styles.pc786postCardGrid} 
            ref={postCardRef}
        >
            <Image
                src = {regular}
                alt = {alt_description}
                loading="lazy"
                className={styles.pc786postCardGridHeaderImage}
                height={parseInt(props.post.height, 10)}
                width={parseInt(props.post.width, 10)}
                placeholder="blur"
                blurDataURL={blurDataUrl}
            />
        </Link>
    )

    return (
        <div 
            className={`${styles.pc786postCard} ${isGrid && styles.pc786postCardGrid}`} 
            ref={postCardRef}
        >
            <div className={styles.pc786postCardHeader}>
                <Image
                    src = {regular}
                    alt = {alt_description}
                    loading="lazy"
                    className={styles.pc786postCardHeaderImage}
                    height={parseInt(props.post.height, 10)}
                    width={parseInt(props.post.width, 10)}
                    onDoubleClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                />
            </div>
            <div className={styles.pc786postCardContent}>
                <div className={styles.pc786postCardInteractions}>
                    <LikeButton
                        isLiked={isLiked}
                        onClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                        dimensions={30}
                        className={styles.pc786likeButton}
                    />
                    <span className={styles.pc786value}>{`${likes} likes`}</span>
                </div>
                <div className={styles.pc786postCardDescription}>{alt_description}</div>
                <Link
                    href={`/user/${username}`}
                    className={styles.pc786postCardUser}>
                    <Image
                        src = {small}
                        alt = {name}
                        loading="lazy"
                        className={styles.pc786postCardUserImage}
                        width={40}
                        height={40}
                    />
                    <div className={styles.pc786postCardUserInfo}>
                        <div className={styles.pc786postCardUserName}>{name}</div>
                        <div className={styles.pc786postCardDate}>{handleDate(props.post.created_at)}</div>
                    </div>
                </Link>
            </div>
        </div>        
    )
}