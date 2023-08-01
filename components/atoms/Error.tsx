import style from '@/styles/atoms/Error.module.css';

interface ErrorProps {
    message: string
}

/*
    This atomic component is used to render error messages
    Refer to @handlers/handleError.ts for error messages this can render
*/
export default function Error(props: ErrorProps) {
    const { message } = props
    return (
        <div className={style.e786em}>{message}</div>
    )
}