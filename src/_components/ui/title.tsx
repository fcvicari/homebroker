"use client";

import { cn } from "@/_lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const titleVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium",
  {
    variants: {
      size: {
        default: "h-9 text-md px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-sm rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 text-lg rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 text-xl font-bold w-full px-4 py-2 has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Title({
  className,
  size,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof titleVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(titleVariants({ size, className }))}
      {...props}
    />
  );
}

export { Title };
