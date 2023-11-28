import { object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBody } from "@/services/auth/type";
import { useLogin } from "@/services/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";

const signInSchema = object({
  email: string().min(1, "Required").email("Invalid Email"),
  password: string()
    .min(1, "Required")
    .min(6, "must be more than 8 characters")
    .max(32, "must be less than 32 characters"),
});
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    resolver: zodResolver(signInSchema),
  });
  const { isLoading, mutate: login, isSuccess } = useLogin();
  const loginSocial = (type: string) => {
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/auth/" + type;
  };

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess]);
  const onSubmitHandler: SubmitHandler<LoginBody> = (values) => {
    if (isLoading) return;
    login(values);
  };
  return (
    <>
      <form
        className="max-w-md w-full  min-w-max rounded-xl p-6 shadow-2xl bg-neutral text-neutral-content "
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-center text-3xl font-mono">Sign In with</h1>
        <div className="grid  grid-cols-2 gap-3 w-full space-3 mt-6">
          <button
            onClick={loginSocial.bind(this, "google")}
            type="button"
            className="btn glass capitalize"
          >
            <FcGoogle size="1.8rem" />
            Google
          </button>
          <button
            onClick={loginSocial.bind(this, "github")}
            type="button"
            className="btn glass capitalize"
          >
            <FaGithub size="1.8rem" />
            Github
          </button>
        </div>
        <div className="text-center mt-6 divider">OR</div>
        <div className="mt-5 space-y-3 ">
          <p className="text-sm font-extralight ">Enter your Email address</p>
          <div>
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
          <p className="text-sm font-extralight">Enter your Password</p>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input input-primary w-full input-md"
            />
            <div className="mt-1 flex justify-between font-semibold text-sm">
              <p className="text-error "> {errors.password?.message}</p>
              <p
                className="m-2 cursor-pointer underline"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Forgot your password ?
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-6 btn btn-primary w-full ${
            isLoading && "no-animation"
          }`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Sign In
        </button>
        <div className="mt-3">
          Don`t have an account
          <span
            onClick={() => router.push("/auth/register")}
            className="mx-2 font-bold text-primary-content cursor-pointer underline"
          >
            Create Account
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
