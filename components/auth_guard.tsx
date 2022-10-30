import { FC, ReactNode } from "react";

type AuthProps = {
  user: string;
  children: ReactNode;
};

export const AuthGuard: FC<AuthProps> = ({ user, children }) => {
  if (user !== "") {
    return <>{children}</>;
  }

  return (
    <div className="flex w-full text-center">
      <p className="flex-1 justify-center mt-64 h-screen">Permission Denied</p>
    </div>
  );
};
