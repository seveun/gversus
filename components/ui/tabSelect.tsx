import React from "react";
import { cn } from "@/lib/utils";

type TabSelectProps = {
  children: React.ReactElement<TabSelectItemProps>[];
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

type TabSelectItemProps = {
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  value: string;
  selected?: boolean;
  variant?: "primary" | "secondary";
};

export const TabSelectItem = ({
  children,
  className = "",
  onChange,
  selected,
  value,
  variant = "primary",
}: TabSelectItemProps) => {
  return (
    <div
      onClick={() => onChange && onChange(selected ? "" : value)}
      className={cn(
        "px-2 py-[1px] w-full rounded-sm cursor-pointer transition-colors duration-500 text-[0.6rem] no-underline flex items-center justify-center",
        {
          "text-white": selected,
          "hover:bg-hover text-gray-500": !selected,
        },
        selected && variant === "primary" && "text-black bg-white",
        selected && variant === "secondary" && "bg-[#282b2e]",
        variant === "secondary" && "px-2.5 rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TabSelect = ({
  children,
  value,
  className = "",
  onChange,
  variant,
  disabled = false,
}: TabSelectProps) => {
  const addPropsToChildren = (
    children: React.ReactElement<TabSelectItemProps>[],
  ) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selected: child.props.value === value,
          onChange: onChange,
          variant: variant,
        });
      }
      return child;
    });
  };

  return (
    <div
      className={cn(
        "flex border rounded-sm p-[2px] bg-secondary text-white/20 whitespace-nowrap item ",
        variant === "secondary" && "rounded-sm",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {addPropsToChildren(children)}
    </div>
  );
};
