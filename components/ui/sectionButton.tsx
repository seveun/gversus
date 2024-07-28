import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import ArrowDownIcon from "./icons/arrowDownIcon";

const SectionButton = ({
  title,
  children,
  buttonText,
  header,
  onClick,
  className = "",
}: {
  title: string;
  children: string | ReactNode;
  buttonText?: string;
  header?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className={className}>
      {header && <div className="font-semibold">{header}</div>}
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-[0.8rem] text-[0.8rem]">{children}</div>
      {buttonText && (
        <Button
          variant="secondary"
          size="xs"
          className="mt-4 font-bold"
          onClick={onClick}
        >
          <div className="flex items-center gap-0.5">
            {buttonText}
            <ArrowDownIcon />
          </div>
        </Button>
      )}
    </div>
  );
};

export default SectionButton;
