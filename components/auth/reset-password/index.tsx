import useNotification from "@/hooks/useNotification";
import { useRestPassword } from "@/services/auth";
import { RestPasswordBody } from "@/services/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "zod";

const RestPasswordSchema = object({
  password: string()
    .min(1, "Required")
    .min(6, "must be more than 8 characters")
    .max(32, "must be less than 32 characters"),
});
const ResetPassword = () => {
  const router = useRouter();
  const { showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestPasswordBody>({
    resolver: zodResolver(RestPasswordSchema),
  });
  const { isLoading, mutate: restPassword, isSuccess } = useRestPassword();

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Done");
      if (isSuccess) router.push("/auth/login");
    }
  }, [isSuccess]);

  const onSubmitHandler: SubmitHandler<RestPasswordBody> = (values) => {
    const { hash } = router.query;
    if (hash) restPassword({ ...values, hash: hash });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full space-y-3 p-6 rounded-xl shadow-2xl bg-neutral text-neutral-content "
      >
        <div className="font-bold text-lg">Reset Password</div>
        <div>
          <p className="text-sm font-extralight ">Enter New Password</p>
          <div className="mt-3">
            <input
              type="password"
              {...register("password")}
              placeholder="New Password"
              className="input input-primary w-full  input-md"
            />
            <p className="mt-1 text-error font-semibold  text-sm">
              {errors.password?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-6 btn btn-primary w-full ${
            isLoading && "no-animation"
          }`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Change Password
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
