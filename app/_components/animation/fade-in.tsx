"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer, staggerChildren } from "./variants";
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

/**
 * Fade in animation component
 * @param children - React children to animate
 * @param className - Optional CSS classes
 * @param delay - Optional animation delay in seconds
 * @param duration - Optional animation duration in seconds
 * @param as - Optional HTML element type (defaults to 'div')
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
  ...props
}: BaseAnimationProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      variants={fadeIn}
      initial="initial"
      animate="animate"
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

/**
 * Fade in up animation component
 * @param children - React children to animate
 * @param className - Optional CSS classes
 * @param delay - Optional animation delay in seconds
 * @param duration - Optional animation duration in seconds
 * @param as - Optional HTML element type (defaults to 'div')
 */
export function FadeInUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
  ...props
}: BaseAnimationProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={className}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Container component that staggers its children's animations
 * Animations trigger when the container enters the viewport
 * @param children - React children to animate
 * @param className - Optional CSS classes
 * @param delay - Optional animation delay in seconds
 * @param duration - Optional animation duration in seconds
 * @param as - Optional HTML element type (defaults to 'div')
 */
export function StaggerContainer({
  children,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
  ...props
}: BaseAnimationProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={className}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Child component for StaggerContainer
 * Must be used within a StaggerContainer to animate
 * @param children - React children to animate
 * @param className - Optional CSS classes
 * @param as - Optional HTML element type (defaults to 'div')
 */
export function StaggerItem({
  children,
  className,
  as: Component = "div",
  ...props
}: BaseAnimationProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent variants={staggerChildren} className={className} {...props}>
      {children}
    </MotionComponent>
  );
}
