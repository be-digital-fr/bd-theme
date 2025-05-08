"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ElementType, ReactNode } from "react";
import { z } from "@zod/mini";

const basePropsSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.optional(z.string()),
  delay: z.optional(z.number()),
  duration: z.optional(z.number()),
  as: z.optional(
    z.custom<ElementType>(
      (v) => typeof v === "string" || typeof v === "function",
      "Invalid element type"
    )
  ),
});

type BaseAnimationProps = z.infer<typeof basePropsSchema> &
  Omit<HTMLMotionProps<"div">, keyof z.infer<typeof basePropsSchema>>;

const scaleIn = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

/**
 * Scale in animation component with spring effect
 * @param children - React children to animate
 * @param className - Optional CSS classes
 * @param delay - Optional animation delay in seconds
 * @param duration - Optional animation duration in seconds
 * @param as - Optional HTML element type (defaults to 'div')
 */
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
  ...props
}: BaseAnimationProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      variants={scaleIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={className}
      transition={{
        delay,
        duration,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}