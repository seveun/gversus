import { cn } from "@/lib/utils";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className={cn("max-w-[1520px] w-full relative", className)}>
        {children}
      </div>
    </div>
  );
};

export default Container;
