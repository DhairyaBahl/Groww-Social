import style from '@/styles/atoms/Error.module.css'

export default function Error(props: any) {
    const { message } = props
    return (
        <div className={style.e786em}>{message}</div>
    )
}