import Loading from "@/components/loading";
import { useEmailConfirm } from "@/services/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RiPassValidFill } from "react-icons/ri";
import { BiErrorAlt } from "react-icons/bi";

const ConfirmEmail = () => {
  const route = useRouter();
  const hash = route.query?.hash;
  const { isLoading, isSuccess, mutate: confirm, isError } = useEmailConfirm();
  useEffect(() => {
    if (hash) confirm({ hash: hash });
  }, []);
  const goToHome = () => {
    location.replace("/");
  };
  return (
    <>
      <div className="bg-base-100 max-w-xl w-full flex flex-col p-5 rounded-xl items-center shadow-2xl">
        <h1 className="text-4xl font-bold text-center">Verified Email</h1>
        {isLoading && <Loading />}
        {isSuccess && (
          <>
            <RiPassValidFill size="100px" className="text-success" />
            <p className="text-lg font-bold text-green-400">
              Email verification was successful.
            </p>
            <div>
              <button
                onClick={() => goToHome()}
                className={"mt-6 btn btn-primary w-full"}
              >
                GO To Home
              </button>
            </div>
          </>
        )}
        {isError && (
          <>
            <BiErrorAlt size="100px" className="text-warning" />
            <p className="text-lg font-bold text-warning">
              An error occurred when verifying the email`s validity.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmEmail;
