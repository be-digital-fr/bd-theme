"use client";
import { cn } from "@/app/_lib";
import { motion, useInView } from "framer-motion";
import * as React from "react";
import { pullupVariant } from "./variants";

const MotionDiv = motion.create("div");

export function LettersPullUp({ text, className = "", containerClassName = "" }: { text: string; className?: string; containerClassName?: string }) {
  const splittedText = text.split("");

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className={cn("flex justify-center", containerClassName)}>
      {splittedText.map((current, i) => (
        <MotionDiv
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn(
            "text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem] w-full",
            className
          )}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </MotionDiv>
      ))}
    </div>
  );
}


 
export function WordsPullUp({
  text,
  className = '',
  containerClassName = '',
}: {
  text: string;
  className?: string;
  containerClassName?: string;
}) {
  const splittedText = text.split(' ');
 
  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className={cn("flex justify-center flex-wrap", containerClassName)}>
      {splittedText.map((current, i) => (
        <MotionDiv
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? 'animate' : ''}
          custom={i}
          className={cn(
            'text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]',
            'pr-2', // class to sperate words
            className
          )}
        >
          {current == '' ? <span>&nbsp;</span> : current}
        </MotionDiv>
      ))}
    </div>
  );
}