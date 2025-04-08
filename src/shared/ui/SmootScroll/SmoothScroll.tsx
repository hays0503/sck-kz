import React, { useRef, useState, useEffect } from "react";
import {
  useTransform,
  useSpring,
  motion,
  useScroll
} from "framer-motion";

// Кастомный useResizeObserver
function useResizeObserver(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return; // защита от null

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  const size = useResizeObserver(scrollRef);

  useEffect(() => {
    if (size.height) {
      setPageHeight(size.height);
    }
  }, [size.height]);

  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const spring = useSpring(transform, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  });
  console.log("pageHeight", pageHeight, "scrollY", scrollY);
  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="scroll-container"
      >
        {children}
      </motion.div>
      {/* Проставляем нужную высоту для правильного scroll */}
      <div style={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;
