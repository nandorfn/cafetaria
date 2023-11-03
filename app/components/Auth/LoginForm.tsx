'use client'
import useLoginForm from "../../hooks/useLoginForm";
import { Transparent } from "../Container/Transparent";
import { Flex } from "../Container/Flex";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const {
    register,
    loading,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  } = useLoginForm();
  return (
    <>
      {loading
        ? <Transparent>
          <span className="loading loading-spinner loading-lg"></span>
        </Transparent>
        : <div className="mx-4">
            <h1 className="text-3xl font-medium">
              Login
            </h1>
            <p className="text-neutral">
              Welcome back! Please enter your details
            </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3 mt-3">
            <label>
              Email
              <input
                {...register("email")}
                type="email"
                placeholder="Enter tour email"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.email &&
              <span className="text-red-500">{errors.email.message}</span>
            }
            <label>
              Password
              <input
                {...register("password")}
                type="password"
                placeholder="Enter tour password"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.password &&
              <span className="text-red-500">{errors.password.message}</span>
            }
            <Flex>
              <button
                className="btn btn-neutral w-full text-white hover:opacity-70 border-0"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Flex>
          </form>
          <Flex className="gap-1 mt-3">
            <p>Didn&apos;t have an account?</p>
            <Link className="font-medium" href={'/register'}>Register here!</Link>
          </Flex>
        </div>
      }
    </>
  );
};

export default LoginForm;