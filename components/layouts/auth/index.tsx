import { ReactElement } from "react";

type componentProps = {
  children: ReactElement;
};

const Auth = ({ children }: componentProps) => {
  return (
    <>
      <div className="w-full h-full relative z-0 overflow-hidden">
        <div className="bg-primary pointer-events-none absolute left-20 aspect-square w-96 rounded-full opacity-20 blur-3xl" />
        <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl" />
        {children}
      </div>
    </>
  );
};

export default Auth;
