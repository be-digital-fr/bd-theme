'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ElementType, PropsWithChildren, HTMLAttributes } from 'react';
import { disappearVariant } from './variants';
import { Button } from '../ui';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const MotionDiv = motion.create('div');

type DisappearContainerProps = PropsWithChildren<{
  props?: typeof MotionDiv;
}>;

type DisappearMainContentProps = PropsWithChildren<{
  props?: any;
  as?: ElementType;
  className?: string;
}>;

type DisappearButtonProps = PropsWithChildren<{
  props?: any;
}>;

export function DisappearContainer({
  children,
  props,
}: DisappearContainerProps) {
  return <AnimatePresence {...props}>{children}</AnimatePresence>;
}

export function DisappearContent({
  children,
  props,
  as: Component = 'div',
  className,
}: DisappearMainContentProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      layout
      variants={disappearVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 20,
      }}
      className={className}
      {...props}>
      {children}
    </MotionComponent>
  );
}

export function DisappearButton({ children, props }: DisappearButtonProps) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      {...props}>
      {children}
    </MotionDiv>
  );
}

export function CartEmpty() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-4 h-full">
      <MotionDiv
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 1,
        }}>
        <Image
          src="/illustrations/empty-cart.png"
          alt="Empty cart"
          width={300}
          height={300}
          priority
        />
      </MotionDiv>
      <p className="text-2xl text-muted-foreground">No items in cart</p>
    </MotionDiv>
  );
}
