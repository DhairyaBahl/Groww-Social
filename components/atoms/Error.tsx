import style from '@/styles/atoms/Error.module.css';

interface ErrorProps {
    message: string
}

export default function Error(props: ErrorProps) {
    const { message } = props
    return (
        <div className={style.e786em}>{message}</div>
    )
}