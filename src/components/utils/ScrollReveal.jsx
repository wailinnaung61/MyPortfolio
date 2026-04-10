"use client";

import { motion } from "framer-motion";
import { blurFadeUp, fadeUp, fadeLeft, fadeRight, revealUp, scaleUp } from "@/lib/motion";

const variantMap = {
  "fade-up": fadeUp,
  "blur-fade-up": blurFadeUp,
  "fade-left": fadeLeft,
  "fade-right": fadeRight,
  "reveal-up": revealUp,
  "scale-up": scaleUp,
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration,
  className = "",
  once = true,
  amount = 0.2,
  as = "div",
}) {
  const variants = variantMap[variant] || fadeUp;
  const MotionTag = motion[as] || motion.div;

  const transitionOverride = {};
  if (delay > 0) transitionOverride.delay = delay;
  if (duration) transitionOverride.duration = duration;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={
        Object.keys(transitionOverride).length
          ? { ...variants.visible.transition, ...transitionOverride }
          : undefined
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}
