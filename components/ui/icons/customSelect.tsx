import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChevronDownIcon from "@/components/ui/icons/chevronDownIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CustomSelect = ({
  children,
  icon,
  placeholder,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  placeholder: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "border text-sm flex items-center justify-between px-2 rounded-sm text-nowrap bg-secondary mx-2 opacity-70 hover:cursor-pointer no-underline",
            isOpen && "bg-hover",
            className,
          )}
        >
          <div className="flex items-center">
            {icon && <div className="mr-1.5">{icon}</div>}
            <div>{placeholder}</div>
          </div>
          <ChevronDownIcon className={cn(isOpen && "rotate-180")} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full border bg-secondary" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CustomSelect;
