import Image from "next/image"
import styles from "@/styles/molecules/PostCard.module.css"
import { useEffect, useRef, useState } from "react"
import LikeButton from "@/components/atoms/LikeButton"
import Link from "next/link";
import { handleDate, handleLike } from "@/handlers";
import { Blurhash } from "react-blurhash";
import IPost from "@/types/post";

interface PostCardProps {
    post: IPost
    isLast?: boolean
    onIntersect?: () => void
    isGrid?: boolean
    comments?: number
}

/*
    This molecule component is used to render a single post
    All the posts on all the pages are rendered using this component
*/
export default function PostCard(props: PostCardProps) {
    const {
        alt_description,
        urls: { regular },
        user: { name, profile_image: { small }, username },
    } = props.post

    const { isLast, onIntersect, isGrid } = props
    const comments = props?.comments || 0

    const ref = useRef(null);
    const [isLiked, setIsLiked] = useState(props?.post?.liked_by_user);
    const [likes, setLikes] = useState(props?.post?.likes);

    useEffect(() => {
        if(!ref.current || !isLast || !onIntersect) return

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && isLast) {
                console.log('last post is visible')
                onIntersect()
                observer.unobserve(entry.target)
            }
        })

        observer.observe(ref.current)
    }, [isLast]);

    if(isGrid)
    return (
        <Link href={`/post/${props.post.id}`} className={styles.pc786postCardGrid} ref={ref}>
            <Blurhash
                hash={props?.post?.blur_hash}
                height={parseInt(props.post.height, 10)}
                width={parseInt(props.post.width, 10)}
                className={`${styles.pc786postCardBlurHash}`}
            />
            <div className={styles.pc786postCardGridImageWrapper}>
                <Image
                    src = {regular}
                    alt = {alt_description}
                    className={`
                        ${styles.pc786postCardGridHeaderImage}` 
                    }
                    height={parseInt(props.post.height, 10)}
                    width={parseInt(props.post.width, 10)}
                />
            </div>
        </Link>
    )
    return (
        <div className={`${styles.pc786postCard} ${isGrid && styles.pc786postCardGrid}`} ref={ref}>
            <Link href={`/user/${username}`} className={styles.pc786postCardUser}>
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
                    className={`${styles.pc786postCardBlurHash}`}
                />
                <div className={styles.pc786postCardImageWrapper}>
                    <Image
                        src = {regular}
                        alt = {alt_description}
                        className={`${styles.pc786postCardHeaderImage}`}
                        height={parseInt(props.post.height, 10)}
                        width={parseInt(props.post.width, 10)}
                        onDoubleClick={() => handleLike({isLiked, setIsLiked, setLikes})}
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
                    <span className={styles.pc786value}>{`${comments} Comments`}</span>
                    <span className={styles.pc786value}>{`${likes} Likes`}</span>
                </div>
            </div>
        </div>        
    )
}