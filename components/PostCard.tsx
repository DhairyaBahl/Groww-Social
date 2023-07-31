import Image from "next/image"
import styles from "@/styles/PostCard.module.css"
import { useEffect, useRef, useState } from "react"
import LikeButton from "@/components/LikeButton"
import Link from "next/link";
import { handleDate, handleLike } from "@/helpers";
import useNextBlurHash from 'use-next-blurhash'
import { Blurhash, BlurhashCanvas } from "react-blurhash";

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
    // const [blurDataUrl] = useNextBlurHash(props?.post?.blur_hash);
    const [isImageLoading, setIsImageLoading] = useState(true);

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

    console.log(isImageLoading)

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
                className={`
                    ${styles.pc786postCardGridHeaderImage}` 
                    + (isImageLoading ? ` ${styles.pc786postCardImageLoading}` : '')
                }
                height={parseInt(props.post.height, 10)}
                width={parseInt(props.post.width, 10)}
                onLoadingComplete={() => setIsImageLoading(false)}
            />
            <Blurhash
                hash={props?.post?.blur_hash}
                height={parseInt(props.post.height, 10)}
                width={parseInt(props.post.width, 10)}
                className={`
                    ${styles.pc786postCardBlurHash}`
                }
            />
        </Link>
    )

    return (
        <div 
            className={`${styles.pc786postCard} ${isGrid && styles.pc786postCardGrid}`} 
            ref={postCardRef}
        >
            <Link
                href={`/user/${username}`}
                className={styles.pc786postCardUser}>
                <Image
                    src = {small}
                    alt = {name}
                    className={styles.pc786postCardUserImage}
                    width={40}
                    height={40}
                />
                <div className={styles.pc786postCardUserInfo}>
                    <div className={styles.pc786postCardUserName}>{name}</div>
                    <div className={styles.pc786postCardDate}>{handleDate(props.post.created_at)}</div>
                </div>
            </Link>
            <div className={styles.pc786postCardHeader}>
                <Blurhash
                    hash={props?.post?.blur_hash}
                    height={parseInt(props.post.height, 10)}
                    width={parseInt(props.post.width, 10)}
                    className={`
                        ${styles.pc786postCardBlurHash}`
                    }
                />
                <div className={styles.pc786postCardImageWrapper}>
                    <Image
                        src = {regular}
                        alt = {alt_description}
                        className={`
                            ${styles.pc786postCardHeaderImage}`
                        }
                        height={parseInt(props.post.height, 10)}
                        width={parseInt(props.post.width, 10)}
                        onDoubleClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                        onLoadingComplete={() => setIsImageLoading(false)}
                    />                
                    <div className={styles.pc786postCardDescription}>{alt_description}</div>
                </div>
            </div>
            <div className={styles.pc786postCardContent}>
                <div className={styles.pc786postCardInteractions}>
                    <LikeButton
                        isLiked={isLiked}
                        onClick={() => handleLike({isLiked, setIsLiked, setLikes})}
                        dimensions={20}
                        className={styles.pc786likeButton}
                    />
                    <span className={styles.pc786value}>{`${10} Comments`}</span>
                    <span className={styles.pc786value}>{`${likes} likes`}</span>
                </div>
            </div>
        </div>        
    )
}