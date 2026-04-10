"use client";

import { motion } from "framer-motion";

const ProgressBar = ({ skill: { title, percentage } }) => {
	return (
		<div className="progress">
			<div className="mb-2 flex items-center justify-between">
				<h5 className="mb-0 text-sm font-medium text-heading">{title}</h5>
				<span className="text-xs font-medium text-primary">{percentage}%</span>
			</div>
			<div className="progress-bar relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
				<motion.span
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					variants={{
						visible: { scaleX: 1, originX: 0 },
						hidden: { scaleX: 0, originX: 0 },
					}}
					className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-accent"
					style={{ width: `${percentage}%` }}
				></motion.span>
			</div>
		</div>
	);
};

export default ProgressBar;
