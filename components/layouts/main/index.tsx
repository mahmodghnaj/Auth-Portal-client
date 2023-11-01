import InitialLoading from "@/components/Initial-loading";
import { useInfSession } from "@/services/auth";
import { selectors } from "@/store";
import Image from "next/image";
import { ReactElement, useEffect } from "react";

type componentProps = {
  children: ReactElement;
};
const Main = ({ children }: componentProps) => {
  const { isLoading, data, isSuccess } = useInfSession();
  const setToken = selectors.auth.setToken();
  useEffect(() => {
    if (isSuccess) {
      setToken(data.token);
    }
  }, [isSuccess]);
  return (
    <>
      <div className="w-full h-full relative z-0 overflow-hidden">
        <div className="bg-primary pointer-events-none absolute left-20 aspect-square w-96 rounded-full opacity-20 blur-3xl" />
        <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl" />
        <main className="w-full h-full relative overflow-hidden z-0 flex flex-1 flex-col">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <InitialLoading />
            </div>
          )}
          {!isLoading && children}
        </main>
      </div>
    </>
  );
};
export default Main;
