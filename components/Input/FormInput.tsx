"use client";
import React, { useState, type HTMLInputTypeAttribute } from "react";
import Button from "../Button/Button";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface FormInputProps<T> {
  placeholder: string;
  name: keyof T;
  id: string;
  label: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
}

const FormInput = <T extends Record<string, string>>(
  props: FormInputProps<T>,
) => {
  const { placeholder, name, id, label, error, type = "text" } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <fieldset>
      <label htmlFor={id} className="">
        <p className="text-left mb-2 text-[14px] leading-[143%] text-black font-medium">
          {label}
        </p>
        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-[10px] border border-gray-200 bg-white outline-none text-[14px] leading-[143%] text-black font-normal placeholder:text-gray-500 focus:border-black focus:shadow-[0_0_10px_rgba(0,0,0,5%)]"
            placeholder={placeholder}
            name={name as string}
            id={id}
            type={type === "password" ? (isVisible ? "text" : type) : type}
          />
          {type === "password" && (
            <Button
              className="absolute top-1/2 right-4 -translate-y-1/2"
              onClick={() => setIsVisible(!isVisible)}
            >
              <div className="relative w-5 h-5">
                <div
                  className={`absolute top-1/2 left-1/2 -translate-1/2 transition-opacity duration-150 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <LuEye />
                </div>
                <div
                  className={`absolute top-1/2 left-1/2 -translate-1/2 transition-opacity duration-150 ${
                    !isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <LuEyeClosed />
                </div>
              </div>
            </Button>
          )}
        </div>
      </label>
      {error && (
        <p className="mt-2 text-left text-[12px] leading-[143%] font-normal text-red-500">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default FormInput;
