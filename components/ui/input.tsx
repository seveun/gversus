import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, icon, iconAfter, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-muted-foreground">{icon}</div>
        )}
        <input
          type={type}
          className={cn(
            "flex-1 h-10 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            icon ? "pl-8" : "pl-3",
            iconAfter ? "pr-10" : "pr-3", // Ajouter une marge à droite si iconAfter est présent
          )}
          ref={ref}
          {...props}
        />
        {iconAfter && <div className="absolute right-3 flex">{iconAfter}</div>}
      </div>
    );
  },
);
Input.displayName = "InputWithIcon";

export { Input };
