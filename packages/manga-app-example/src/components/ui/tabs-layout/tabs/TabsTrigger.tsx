'use client';
import React from 'react';
import { TabsTrigger as Trigger } from "@/components/ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from '@/lib/utils';

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      "w-full h-[40px] px-[20px]",
      "flex items-center",
      "font-['Avenir_Next'] text-sm text-brand-black",
      "rounded-none",
      "data-[state=active]:border-r-2 data-[state=active]:border-brand data-[state=active]:text-brand data-[state=active]:shadow-none",
      "hover:translate-x-1 hover:data-[state=active]:translate-x-0 transition-all duration-200",
      "max-lg:h-[30px] max-lg:max-w-[130px] max-lg:text-xs",
      "max-lg:px-0",
      "max-lg:data-[state=active]:border-r-0 max-lg:data-[state=active]:border-b-2 max-lg:hover:-translate-y-1 max-lg:hover:translate-x-0 max-lg:hover:data-[state=active]:translate-y-0",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export default TabsTrigger;