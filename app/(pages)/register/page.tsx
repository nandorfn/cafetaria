'use client'
import Link from "next/link";
import useRegisterForm from "../../hooks/useRegisterForm";
import { Flex } from "../../components/Container/Flex";
import { Transparent } from "../../components/Container/Transparent";

const Page = () => {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    isSubmitting,
    onSubmit
  } = useRegisterForm();

  return (
    <>
      {loading
        ? <Transparent>
          <span className="loading loading-spinner loading-lg"></span>
        </Transparent>
        : <div className="mx-4">
          <h1 className="text-3xl font-medium">
            Create an account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3 mt-3">
            <label>
              {'Name'}
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.name &&
              <span className="text-red-500">{errors.name.message}</span>
            }
            <label>
              {'Email'}
              <input
                {...register("email")}
                type="email"
                placeholder="example@example.com"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.email &&
              <span className="text-red-500">{errors.email.message}</span>
            }

            <label>
              {'Password'}
              <input
                {...register("password")}
                type="password"
                placeholder="Min. 8 characters"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.password &&
              <span className="text-red-500">{errors.password.message}</span>
            }

            <label>
              {'Confirm Password'}
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full bg-white"
              />
            </label>
            {
              errors.confirmPassword &&
              <span className="text-red-500">{errors.confirmPassword.message}</span>
            }

            <Flex align={'between'}>
              <button
                className="w-full btn text-white hover:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Flex>
          </form>
          <Flex className="gap-1 mt-3">
            <p>Already have an account?</p>
            <Link className="font-medium" href={'/'}>Login here!</Link>
          </Flex>
        </div>
      }

    </>
  );
};

export default Page;