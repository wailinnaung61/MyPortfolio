"use client";

import { motion } from "framer-motion";
import { ReactSVG } from "react-svg";

const Service = ({ service: { title, text, icon } }) => {
	return (
		<motion.div
			whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
			className="service card relative overflow-hidden p-5 md:p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
		>
			<span className="service-icon mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-2xl text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
				<ReactSVG
					className="fill-current text-primary"
					src={icon}
					beforeInjection={(svg) => {
						svg.setAttribute("height", "auto");
						svg.setAttribute("width", "auto");
						svg.setAttribute("fill", "currentColor");
					}}
				/>
			</span>
			<h5 className="mb-2 text-base font-semibold">{title}</h5>
			<p className="text-sm text-body/70">{text}</p>
		</motion.div>
	);
};

export default Service;
