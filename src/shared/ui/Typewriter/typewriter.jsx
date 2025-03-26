"use client";
import { motion } from "framer-motion";

export const sentenceVariants = {
  hidden: {},
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export const letterVariants = {
  hidden: { opacity: 0, y: 10 }, // Начинаем чуть ниже
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      opacity: { duration: 0.2 }, 
      y: { type: "spring", stiffness: 300, damping: 10 } // Пружинный эффект
    } 
  }
};

export const Typewriter = ({ text, ...rest }) => (<motion.p
    key={text}
    variants={sentenceVariants}
    initial="hidden"
    animate="visible"
    {...rest}
  >
    {text.split("").map((char, i) => (
      <motion.span key={`${char}-${i}`} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.p>
);
