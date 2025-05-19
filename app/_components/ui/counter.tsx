"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/app/_lib/utils"

interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
}

export function Counter({
  value,
  onValueChange,
  min = 0,
  max = 10,
  className,
  ...props
}: CounterProps) {
  const increment = () => {
    if (value < max) {
      onValueChange(value + 1)
    }
  }

  const decrement = () => {
    if (value > min) {
      onValueChange(value - 1)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={decrement}
        disabled={value <= min}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <span className="w-8 text-center font-medium">{value}</span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={increment}
        disabled={value >= max}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  )
} 