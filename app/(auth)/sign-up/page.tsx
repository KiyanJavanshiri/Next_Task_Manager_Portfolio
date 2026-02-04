import React from "react";
import Button from "@/components/Button/Button";
import FormInput from "@/components/Input/FormInput";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <form className="text-center p-6 rounded-[10px] bg-white border border-gray-200 min-w-86">
      <h2 className="text-[18px] leading-[143%] font-semibold mb-1">Sign Up</h2>
      <p className="text-sm leading-[143%] font-normal text-gray-500">
        Enter your details to sign up
      </p>
      <div className="flex flex-col gap-y-4 mt-6">
        <div className="flex justify-between items-center gap-x-2">
          <FormInput
            name="email"
            placeholder="Enter your Email"
            id="email-input"
            label="Email"
            type="text"
          />
          <FormInput
            name="email"
            placeholder="Enter your Email"
            id="email-input"
            label="Email"
            type="text"
          />
        </div>
        <div className="flex justify-between items-center gap-x-2">
          <FormInput
            name="email"
            placeholder="Enter your Email"
            id="email-input"
            label="Email"
            type="text"
          />
          <FormInput
            name="email"
            placeholder="Enter your Email"
            id="email-input"
            label="Email"
            type="text"
          />
        </div>
        <FormInput
          name="password"
          placeholder="Enter your Password"
          id="password-input"
          label="Password"
          type="password"
        />
        <Button className="p-2 mt-4 w-full rounded-[10px] bg-black text-center text-base text-white leading-[143%] font-medium">
          Sign Up
        </Button>
      </div>
      <p className="mt-4 text-sm leading-[143%] font-normal text-gray-400">
        Already have an account?{" "}
        <Link className="underline text-black font-semibold" href={"/sign-in"}>
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpPage;
