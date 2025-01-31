import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Flex } from "antd";

const Animation = () => {

    const scale = 7

    const styleAnimation: React.CSSProperties = { 
        width: "100dvw",
        height: "100dvh",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        zIndex: 9999,
        background: "rgba(0,0,0,0.4)",
    }

    const styleContainer: React.CSSProperties = {
        position: "relative",
        width: 50 * scale,
        height: 50 * scale,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const styleSpan: React.CSSProperties = {
        display: "block",
        width: 50 * scale,
        height: 50 * scale,
        border: "7px solid #eee",
        borderTop: "1px solid #8A2387 ",
        borderRight: "3px solid #E94057",
        borderBottom: "7px solid #F27121",
        borderRadius: "50%",
        boxSizing: "border-box",
        position: "absolute"
    };

    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1
    };

    return (
        <Flex justify="center" align="center" style={styleAnimation}>
            <div style={styleContainer}>
                <motion.span
                    style={styleSpan}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                ></motion.span>
                <Image src={'/logo.svg'} alt="logo" width={30 * scale} height={30 * scale} className="logo" />
            </div>
        </Flex>
    );
}

export default Animation;
