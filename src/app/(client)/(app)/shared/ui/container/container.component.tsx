import { cn } from "@/pkg/utils/cn/cn";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  variant?: "main" | "section";
}

const ContainerComponent: FC<Readonly<IProps>> = (props) => {
  const { children, className = "", variant = "main" } = props;

  return (
    <>
      {variant === "main" ? (
        <main
          className={cn(
            `mx-auto w-full max-w-7xl pt-16 max-[1320px]:px-6 max-md:px-4`,
            className
          )}
        >
          {children}
        </main>
      ) : (
        <div className={cn(`mx-auto flex w-full flex-col gap-4`, className)}>
          {children}
        </div>
      )}
    </>
  );
};

export default ContainerComponent;
