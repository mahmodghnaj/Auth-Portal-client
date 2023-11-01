import useNotification from "@/hooks/useNotification";
import { useForgotPassword } from "@/services/auth";
import { ForgotPasswordBody } from "@/services/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "zod";

const ForgotPasswordSchema = object({
  email: string().min(1, "Required").email("Invalid"),
});
const ForgotPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordBody>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const { isLoading, mutate: forgotPassword, isSuccess } = useForgotPassword();
  const { showSuccess } = useNotification();

  const onSubmitHandler: SubmitHandler<ForgotPasswordBody> = (values) => {
    forgotPassword(values);
  };
  useEffect(() => {
    if (isSuccess) {
      showSuccess("Done");
    }
  }, [isSuccess]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full space-y-3 p-6 rounded-xl shadow-2xl bg-neutral text-neutral-content "
      >
        <div className="font-bold text-lg">Forgot your password ?</div>
        <div>
          Enter Valid Registered Email Address. A Link will be sent to your
          Email to Reset your Password.
        </div>
        <div>
          <p className="text-sm font-extralight ">Enter your Email address</p>
          <div className="mt-3">
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="input input-primary w-full  input-md"
            />
            <p className="mt-1 text-error font-semibold  text-sm">
              {errors.email?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-6 btn btn-primary w-full capitalize ${
            isLoading && "no-animation"
          }`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Reset Password
        </button>
        <div
          className="text-primary-content font-bold text-md text-center underline cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          Go to Sign In
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
