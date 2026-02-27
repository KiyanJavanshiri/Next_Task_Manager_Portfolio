"use client";
import { useActionState } from "react";
import z from "zod";
import { authScheme } from "@/utils/authValidation";
import { actionSignUpAuth } from "@/utils/actions/auth/auth";
import Button from "@/components/Button/Button";
import FormInput from "@/components/Input/FormInput";
import Link from "next/link";

type SignUpFormFields = z.infer<typeof authScheme>;

const SignUpPage = () => {
  const [state, action, isPending] = useActionState(
    actionSignUpAuth,
    undefined,
  );
  return (
    <form
      action={action}
      className="text-center p-6 rounded-[10px] bg-white border border-gray-200 min-w-86 dark:bg-gray-800 dark:border-gray-700"
    >
      <h2 className="text-[18px] leading-[143%] font-semibold mb-1 dark:text-white">Sign Up</h2>
      <p className="text-sm leading-[143%] font-normal text-gray-500 dark:text-gray-300">
        Enter your details to sign up
      </p>
      <div className="flex flex-col gap-y-4 mt-6">
        <div className="flex justify-between items-center gap-x-2">
          <FormInput<SignUpFormFields>
            name="firstName"
            placeholder="Enter your FirstName"
            id="firstName-input"
            label="FirstName"
            type="text"
            error={state?.errors?.firstName && state.errors.firstName[0]}
          />
          <FormInput<SignUpFormFields>
            name="lastName"
            placeholder="Enter your LastName"
            id="lastName-input"
            label="LastName"
            type="text"
            error={state?.errors?.lastName && state.errors.lastName[0]}
          />
        </div>
        <div className="flex justify-between items-center gap-x-2">
          <FormInput<SignUpFormFields>
            name="login"
            placeholder="Enter your Login"
            id="login-input"
            label="Login"
            type="text"
            error={state?.errors?.login && state.errors.login[0]}
          />
          <FormInput<SignUpFormFields>
            name="email"
            placeholder="Enter your Email"
            id="email-input"
            label="Email"
            type="text"
            error={state?.errors?.email && state.errors.email[0]}
          />
        </div>
        <FormInput<SignUpFormFields>
          name="password"
          placeholder="Enter your Password"
          id="password-input"
          label="Password"
          type="password"
          error={state?.errors?.password && state.errors.password[0]}
        />
        <Button
          type="submit"
          className="p-2 mt-4 w-full rounded-[10px] bg-black text-center text-base text-white leading-[143%] font-medium disabled:bg-gray-600 dark:bg-gray-100 dark:text-gray-900 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Sign Up"}
        </Button>
      </div>
      <p className="mt-4 text-sm leading-[143%] font-normal text-gray-400 dark:text-gray-400">
        Already have an account?{" "}
        <Link className="underline text-black font-semibold dark:text-white" href={"/sign-in"}>
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpPage;
