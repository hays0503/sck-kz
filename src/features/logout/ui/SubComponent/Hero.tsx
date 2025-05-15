'use client';

import { motion } from 'framer-motion';
import { Button } from 'antd';

const AnimatedSVG = () => (
  <motion.svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 1, rotate: 0, opacity: 0.5 }}
    animate={{
      scale: [1, 1.02, 1],
      rotate: [0, 360],
      opacity: [0.5, 0.6, 0.5],
    }}
    transition={{
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
    }}
  >
    {/* Здесь ваш SVG-контент */}
    <circle cx="400" cy="300" r="200" fill="url(#grad)" />
    <defs>
      <radialGradient id="grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffc600" stopOpacity="0.1" />
      </radialGradient>
    </defs>
  </motion.svg>
);

const FloatingShapes = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-6 h-6 bg-white/10 backdrop-blur rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
    ))}
  </>
);

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#ffc600] text-black py-24 flex flex-col items-center justify-center text-center px-4">
      <AnimatedSVG />
      <FloatingShapes />

      {/* Основной заголовок */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        SCK (ЭсСиКей)
      </motion.h1>

      {/* Слоган */}
      <motion.p
        className="text-2xl mt-2 font-medium relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Зона Уникальных Цен
      </motion.p>

      {/* Кнопки */}
      <motion.div
        className="mt-8 flex gap-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Button type="primary" size="large">
          Просмотреть коллекцию
        </Button>
        <Button type="default" size="large">
          Узнать больше
        </Button>
      </motion.div>
    </section>
  );
}
