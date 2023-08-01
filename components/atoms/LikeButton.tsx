import styles from "@/styles/atoms/LikeButton.module.css";

interface LikeButtonProps {
    isLiked: boolean,
    dimensions: number,
    onClick: () => void,
    className?: string
};

export default function LikeButton(props: LikeButtonProps) {
    const { 
        isLiked, 
        dimensions, 
        onClick,
        className
    } = props;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={dimensions}
            height={dimensions}
            fill={isLiked ? "red" : "currentColor"}
            viewBox="0 0 16 16"
            className={`${styles.lb786likeButton} ${className}`}
            onClick={onClick}
        >
            <path 
                fillRule="evenodd" 
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
        </svg>
    );

}