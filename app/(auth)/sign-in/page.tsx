"use client";
import React, { useActionState } from "react";
import z from "zod";
import { authScheme } from "@/utils/authValidation";
import { actionLoginAuth } from "@/utils/actions";
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button/Button";
import Link from "next/link";

const SignInPage = () => {
  const [state, action, isPending] = useActionState(actionLoginAuth, undefined);

  type LoginFormFields = Pick<z.infer<typeof authScheme>, "email" | "password">;
  return (
    <form
      action={action}
      className="text-center p-6 rounded-[10px] bg-white border border-gray-200 min-w-86"
    >
      <h2 className="text-[18px] leading-[143%] font-semibold mb-1">Sign In</h2>
      <p className="text-sm leading-[143%] font-normal text-gray-500">
        Enter your details to sign in
      </p>
      <div className="flex flex-col gap-y-4 mt-6">
        <FormInput<LoginFormFields>
          name="email"
          placeholder="Enter your Email"
          id="email-input"
          label="Email"
          type="text"
          error={state?.errors.email && state.errors.email[0]}
        />
        <FormInput<LoginFormFields>
          name="password"
          placeholder="Enter your Password"
          id="password-input"
          label="Password"
          type="password"
          error={state?.errors.password && state.errors.password[0]}
        />
        <Button
          type="submit"
          className="p-2 mt-4 w-full rounded-[10px] bg-black text-center text-base text-white leading-[143%] font-medium disabled:bg-gray-600"
          disabled={isPending}
        >
          {isPending ? "Submiting..." : "Sign In"}
        </Button>
      </div>
      <p className="mt-4 text-sm leading-[143%] font-normal text-gray-400">
        Don&apos;t have an account yet?{" "}
        <Link className="underline text-black font-semibold" href={"/sign-up"}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInPage;
