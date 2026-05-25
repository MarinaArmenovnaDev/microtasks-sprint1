import type {ReactNode} from "react";

type Props = {
    children: ReactNode
    onClick?: () => void
    color: string
}

export const SuperButton = ({children, onClick, color}: Props) => {
    return (
        <button onClick={onClick} color={color}>{children}</button>
    )
}
