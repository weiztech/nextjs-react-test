import { ReactNode, ComponentType, FC } from "react";

type BasicCardProps = {
  Child?: ComponentType;
  children?: ReactNode;
  className?: string;
};

export const BasicCard: FC<BasicCardProps> = ({
  Child,
  children,
  className,
}) => {
  const classx = "rounded-lg py-5 " + (className ? className : "");
  let component = <></>;
  if (children) {
    component = <>{children}</>;
  } else if (Child) {
    component = <Child />;
  }
  return <div className={classx}>{component}</div>;
};
