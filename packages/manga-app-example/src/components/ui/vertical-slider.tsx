"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const VerticalSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-2 h-full grow overflow-hidden rounded-full bg-stone-300 dark:bg-stone-700">
      <SliderPrimitive.Range className="absolute w-full bg-[#B0B0B0] dark:bg-stone-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb style={
      {
        boxShadow: "0 0 16px rgba(200, 200, 200, 0.25)",
      }
    } className="block -ml-1 h-2.5 w-2.5 rounded-full  bg-[#fcaf1b] ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-stone-50 dark:bg-stone-700 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300" />
  </SliderPrimitive.Root>
));
VerticalSlider.displayName = "VerticalSlider";
export { VerticalSlider };
