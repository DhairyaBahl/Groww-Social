import styles from '@/styles/atoms/Main.module.css';

interface MainProps {
    children: React.ReactNode
}

/*
    This atomic component is used to render main container
*/
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