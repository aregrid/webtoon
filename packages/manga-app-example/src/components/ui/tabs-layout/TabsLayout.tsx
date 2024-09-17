import React from 'react';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from './tabs';
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface TabsLayoutProps {
  triggers: {
    text: string;
    value: string;
  }[];
}

export const TabsLayout: React.ForwardRefExoticComponent<
  TabsPrimitive.TabsProps &
    React.RefAttributes<HTMLDivElement> &
    TabsLayoutProps
> = React.forwardRef(({ children, triggers = [],...props }, ref) => {
  return (
    <Tabs
      {...props}
      className="flex max-lg:flex-col flex-row items-start w-full h-full max-lg:space-y-3 max-lg:space-x-0 space-x-3"
      ref={ref}
    >
      <div className="max-lg:w-full w-[196px] rounded-md bg-white shadow-[0px_0px_4px_0px_rgba(156,156,156,.25)]">
        <TabsList className="flex max-lg:flex-row flex-col max-lg:flex-wrap max-lg:align-start h-auto py-[14px] max-lg:py-0 max-lg:px-[10px] bg-inherit rounded-0 px-0">
          {triggers.map((trigger, idx) => (
            <TabsTrigger key={idx} value={trigger.value}>
              {trigger.text}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="h-full grow overflow-auto rounded-md bg-white shadow-[0px_0px_4px_0px_rgba(156,156,156,.25)] max-lg:w-full">
        {children}
      </div>
    </Tabs>
  );
});

TabsLayout.displayName = "TabLayout";

export default TabsLayout;