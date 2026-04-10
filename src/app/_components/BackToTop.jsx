"use client";

import useEventListener from "@/hooks/useEventListener";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import Scroll from "react-scroll";

export default function BackToTop() {
	const [backToTop, setBackToTop] = useState(false);

	const scroll = Scroll.animateScroll;

	const isVisible = () => {
		const scrollTop = window.scrollY;
		scrollTop > 500 ? setBackToTop(true) : setBackToTop(false);
	};

	useEventListener("scroll", isVisible);

	return (
		<AnimatePresence>
			{backToTop && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 20 }}
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="btn fixed bottom-12 left-auto top-auto right-7 z-30 rounded-full p-2.5 text-xl shadow-lg shadow-primary/20"
					onClick={() => scroll.scrollToTop()}
				>
					<RiArrowUpSLine />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
