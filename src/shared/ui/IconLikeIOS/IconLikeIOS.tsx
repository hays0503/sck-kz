import { Flex } from "antd"
import Image from "next/image"
import { CSSProperties } from "react"

interface IconLikeIOSProps {
    src: string,
    size?: number
    color?: string,
    ionicons?:boolean
}

const IconLikeIOS: React.FC<IconLikeIOSProps> = ({ src, size = 24, color = "#ffba06",ionicons }) => {

    const fullSrc = ionicons?`/ionicons/${src}.svg`:src
    const backgroundStyle: CSSProperties = {
        background: color,
        padding:"3px",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    } 
    const foregroundStyle: CSSProperties = {
        filter: "brightness(0) invert(1)"
    }
    return <Flex align="center" justify="center" style={backgroundStyle}>
        <Image
            src={fullSrc}
            width={size}
            height={size}
            alt="src"
            style={foregroundStyle}
        /></Flex>
}

export default IconLikeIOS