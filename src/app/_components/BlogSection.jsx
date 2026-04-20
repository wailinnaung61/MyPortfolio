"use client";

import { Spinner } from "@/components/utils";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Blog from "../(blogging)/_components/Blog";

const BlogSection = ({ posts }) => {
	const [mounted, setMounted] = useState(false);
	const sliderRef = useRef(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	if (!mounted)
		return (
			<div className="block py-20 text-center">
				<Spinner />
			</div>
		);
	if (!posts || posts.length === 0) {
		return (
			<div className="block py-20 text-center">
				<p>No blog posts found.</p>
			</div>
		);
	}

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.15 }}
			variants={fadeUp}
			className="swiper-holder"
		>
			<Swiper
				className="blog-swiper"
				modules={[Autoplay]}
				spaceBetween={28}
				slidesPerView={3}
				autoplay={{
					delay: 5000,
				}}
				centerInsufficientSlides={true}
				ref={sliderRef}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
			>
				{posts &&
					posts.map((post, index) => (
						<SwiperSlide key={index} className="!h-auto">
							<div className="slider-item flex h-full">
								<Blog post={post} />
							</div>
						</SwiperSlide>
					))}
			</Swiper>
			<button className="swiper-button-prev" onClick={handlePrev}></button>
			<button className="swiper-button-next" onClick={handleNext}></button>
		</motion.div>
	);
};

export default BlogSection;
