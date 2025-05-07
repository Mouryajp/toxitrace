import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[1.25rem_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start",
  {
    variants: {
      variant: {
        success: "bg-green-100 text-green-800 border-green-300",
        failure: "bg-red-100 text-red-800 border-red-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

type AlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    title: string;
    description?: string;
    timeout?: number;
    onDismiss?: () => void;
  };

function Alert({
  className,
  variant,
  title,
  description,
  timeout = 4000,
  onDismiss,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="col-start-2 font-semibold">{title}</div>
      {description && (
        <div className="col-start-2 text-sm text-muted-foreground">{description}</div>
      )}
    </div>
  );
}

export { Alert };


// import * as React from "react"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

// const alertVariants = cva(
//   "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
//   {
//     variants: {
//       variant: {
//         default: "bg-card text-card-foreground",
//         destructive:
//           "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function Alert({
//   className,
//   variant,
//   ...props
// }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
//   return (
//     <div
//       data-slot="alert"
//       role="alert"
//       className={cn(alertVariants({ variant }), className)}
//       {...props}
//     />
//   )
// }

// function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="alert-title"
//       className={cn(
//         "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function AlertDescription({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="alert-description"
//       className={cn(
//         "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Alert, AlertTitle, AlertDescription }
