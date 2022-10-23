import { BasicCard } from "./basic_card";
import { FC } from "react";

type CountCardProps = {
  ttl: number;
  label: string;
  className?: string;
};

export const CountCard: FC<CountCardProps> = ({ ttl, label, className }) => {
  const classNames =
    "flex-1 sm:px-5 shadow-lg text-white px-1 " +
    (className ? className : "bg-blue-700 bg-opacity-80");
  return (
    <BasicCard className={classNames}>
      <ul className="h-full items-center justify-items-center">
        <li>
          <h1>{ttl}</h1>
        </li>
        <li className="mt-1">
          <h1>{label}</h1>
        </li>
      </ul>
    </BasicCard>
  );
};
