import styles from '@/styles/atoms/Main.module.css';

interface MainProps {
    children: React.ReactNode
}

export default function Main(props: MainProps) {
    const { children } = props;
    return (
        <div className={styles.m786main}>
            <div className={styles.m786mainContainer}>
                {children}
            </div>
        </div>
    )
}