"use client";
import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import z from "zod";
import { authScheme } from "@/utils/authValidation";
import { actionLoginAuth } from "@/utils/actions/auth/auth";
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button/Button";
import InformModal from "@/components/Modal/InformModal";

type LoginFormFields = Pick<z.infer<typeof authScheme>, "login" | "password">;

const SignInPage = () => {
  const [state, action, isPending] = useActionState(actionLoginAuth, undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (state?.message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [state?.message]);

  return (
    <>
      <form
        action={action}
        className="text-center p-6 rounded-[10px] bg-white border border-gray-200 min-w-86 dark:bg-gray-800 dark:border-gray-700"
      >
        <h2 className="text-[18px] text-black leading-[143%] font-semibold mb-1 dark:text-white">
          Sign In
        </h2>
        <p className="text-sm leading-[143%] font-normal text-gray-500 dark:text-gray-300">
          Enter your details to sign in
        </p>
        <div className="flex flex-col gap-y-4 mt-6">
          <FormInput<LoginFormFields>
            name="login"
            placeholder="Enter your Login"
            id="login-input"
            label="Login"
            type="text"
            error={state?.errors?.login && state.errors.login[0]}
          />
          <FormInput<LoginFormFields>
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
            {isPending ? "Submitting..." : "Sign In"}
          </Button>
        </div>
        <p className="mt-4 text-sm leading-[143%] font-normal text-gray-400 dark:text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            className="underline text-black font-semibold dark:text-white"
            href={"/sign-up"}
          >
            Sign Up
          </Link>
        </p>
      </form>
      {isOpen && (
        <InformModal onClose={handleCloseModal} message={state!.message!} />
      )}
    </>
  );
};

export default SignInPage;
