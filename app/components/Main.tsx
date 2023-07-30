import styles from '@/app/styles/Main.module.css';

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.m786main}>
            <div className={styles.m786mainContainer}>
                {children}
            </div>
        </div>
    )
}