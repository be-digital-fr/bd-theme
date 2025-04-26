import * as React from 'react';
import * as z from '@zod/mini';
import { cn } from '@/app/_lib/utils';

// Define the schema using zod
const maxWidthSchema = z.enum(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl']);

type ContainerProps = {
  className?: string;
  maxWidth?: z.infer<typeof maxWidthSchema>;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Container component for consistent layout widths and padding
 * @param {ContainerProps} props - Component props
 * @returns {JSX.Element} Container component
 */
export default function Container({
  children,
  maxWidth = '8xl',
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  // Validate maxWidth using zod
  maxWidthSchema.parse(maxWidth);

  return (
    <Component
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-28 w-full',
        {
          'max-w-screen-sm': maxWidth === 'sm',
          'max-w-screen-md': maxWidth === 'md',
          'max-w-screen-lg': maxWidth === 'lg',
          'max-w-screen-xl': maxWidth === 'xl',
          'max-w-screen-2xl': maxWidth === '2xl',
          'max-w-3xl': maxWidth === '3xl',
          'max-w-4xl': maxWidth === '4xl',
          'max-w-5xl': maxWidth === '5xl',
          'max-w-6xl': maxWidth === '6xl',
          'max-w-7xl': maxWidth === '7xl',
          'max-w-8xl': maxWidth === '8xl',
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
