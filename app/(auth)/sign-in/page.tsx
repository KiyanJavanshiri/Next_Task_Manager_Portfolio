"use client";
import React from "react";
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button/Button";
import Link from "next/link";

const SignInPage = () => {
  return (
    <form>
      <h2>Sign In</h2>
      <p>Enter your details to sign in</p>
      <div className="">
        <FormInput
          name="email"
          placeholder="Enter your Email"
          id="email-input"
          label="Email"
          type="text"
        />
        <FormInput
          name="password"
          placeholder="Enter your Password"
          id="password-input"
          label="Password"
          type="password"
        />
        <Button className="">Sign In</Button>
      </div>
      <p>
        Don&apos;t have an account yet? <Link href={"/sign-up"}>Sign Up</Link>
      </p>
    </form>
  );
};

export default SignInPage;
