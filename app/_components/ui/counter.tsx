'use client';

import * as React from 'react';
import { Minus, PlusIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/app/_lib/utils';

/**
 * Props interface for the Counter component
 * @interface CounterProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {number} value - Current value of the counter
 * @property {(value: number) => void} onValueChange - Callback function when value changes
 * @property {number} [min=0] - Minimum allowed value
 * @property {number} [max=10] - Maximum allowed value
 */
interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
}

/**
 * Counter Component
 *
 * A customizable counter component with increment/decrement controls.
 * Includes accessibility features for screen readers and keyboard navigation.
 *
 * @param {CounterProps} props - Component props
 * @returns {JSX.Element} Counter component
 */
export function Counter({
  value,
  onValueChange,
  min = 0,
  max = 10,
  className,
  ...props
}: CounterProps) {
  /**
   * Increments the counter value if below maximum
   */
  const increment = () => {
    if (value < max) {
      onValueChange(value + 1);
    }
  };

  /**
   * Decrements the counter value if above minimum
   */
  const decrement = () => {
    if (value > min) {
      onValueChange(value - 1);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-px bg-background rounded-2xl p-2 border border-gray-300',
        className
      )}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Quantity selector"
      {...props}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-4 w-4 border-none text-primary-dark"
        onClick={decrement}
        disabled={value <= min}
        aria-label={`Decrease quantity to ${value - 1}`}>
        <Minus className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Decrease</span>
      </Button>
      <span
        className="w-5 text-center font-medium"
        aria-live="polite"
        aria-atomic="true">
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-4 w-4 border-none text-primary-dark"
        onClick={increment}
        disabled={value >= max}
        aria-label={`Increase quantity to ${value + 1}`}>
        <PlusIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}
