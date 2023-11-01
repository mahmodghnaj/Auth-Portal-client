import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterBody } from "@/services/auth/type";
import { useRegister } from "@/services/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";

const signUpSchema = object({
  firstName: string().min(1, "Required"),
  lastName: string().min(1, "Required"),
  email: string().min(1, "Required").email("Invalid"),
  password: string()
    .min(1, "Required")
    .min(6, "must be more than 8 characters")
    .max(32, "must be less than 32 characters"),
  confirmPassword: string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match",
});
export type signUpInput = TypeOf<typeof signUpSchema>;

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const { isLoading, mutate: signUp, isSuccess } = useRegister();

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess]);

  const onSubmitHandler: SubmitHandler<RegisterBody> = (values) => {
    if (isLoading) return;
    signUp(values);
  };
  return (
    <>
      <form
        className="max-w-md w-full  min-w-max rounded-xl p-6 shadow-2xl bg-neutral text-neutral-content "
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-center text-3xl font-mono">Sign Up with</h1>
        <div className="grid  grid-cols-2 gap-3 w-full md:space-3 xs:space-1  mt-6">
          <button type="submit" className="btn glass capitalize">
            <FcGoogle size="1.8rem" />
            Google
          </button>
          <button type="submit" className="btn glass capitalize">
            <FaGithub size="1.8rem" />
            Github
          </button>
        </div>
        <div className="text-center mt-6 divider">OR</div>
        <div className="mt-5 md:space-y-3 xs:space-y-1 ">
          <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-3 xs:gap-1">
            <div>
              <p className="text-sm font-extralight ">Enter your First Name</p>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="input md:mt-3 xs:mt-1 input-primary w-full  input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <p className="text-sm font-extralight ">Enter your Last Name</p>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="input md:mt-3 xs:mt-1 input-primary w-full  input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.email?.message}
              </p>
            </div>
          </div>
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
          <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-3 xs:gap-1">
            <div>
              <p className="text-sm  font-extralight">Enter your Password</p>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="md:mt-3 xs:mt-1 input input-primary w-full input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <p className="text-sm font-extralight"> Confirm Password</p>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="md:mt-3 xs:mt-1 input input-primary w-full input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.confirmPassword?.message}
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
          Sign Up
        </button>
        <div className="md:mt-3 xs:mt-1">
          Have An Account?
          <span
            onClick={() => router.push("/auth/login")}
            className="mx-2 font-bold text-primary-content cursor-pointer underline"
          >
            Sign in
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
