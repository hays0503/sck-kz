"use client";
import { unstable_ViewTransition as ViewTransition } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<ViewTransition>
			<motion.div
				initial={{ opacity: 0.1 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "easeInOut", duration: 0.3 }}
			>
				{children}
			</motion.div>
		</ViewTransition>
	);
}
