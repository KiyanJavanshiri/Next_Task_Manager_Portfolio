"use client";
import { useRef, useState, useActionState } from "react";
import z from "zod";
import { authScheme } from "@/utils/authValidation";
import { updateUser } from "@/utils/actions/user/updateUser";
import { MemberUser } from "@/utils/types";
import Image from "next/image";
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button/Button";

type ProfileFormFields = Omit<
  z.infer<typeof authScheme>,
  "login" | "password"
> & { avatarUrl: string };

export type ProfileFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
      };
      success?: boolean;
    }
  | undefined;

const ProfileEditForm = ({ user }: { user: MemberUser }) => {
  const [state, action, isPending] = useActionState(updateUser, undefined);
  const [isChanged, setIsChanged] = useState(false);
  const initialData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatarUrl || "",
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOnChange = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const currentValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      avatar: formData.get("avatarUrl"),
    } as typeof initialData;

    const changed =
      currentValues.firstName.trim() !== initialData.firstName ||
      currentValues.lastName.trim() !== initialData.lastName ||
      currentValues.email.trim() !== initialData.email ||
      currentValues.avatar.trim() !== initialData.avatar;

    setIsChanged(changed);
  };

  return (
    <form
      action={action}
      ref={formRef}
      onChange={handleOnChange}
      className="flex-1 flex flex-col gap-y-4"
    >
      <div className="">
        <h3 className="text-sm leading-[143%] text-gray-500 font-medium">
          My picture
        </h3>
        <div className="mt-4 flex justify-start items-center gap-x-8">
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
            <Image
              src={user?.avatarUrl || "/images/no-avatar.png"}
              alt={`${user?.firstName} avatar`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <FormInput<ProfileFormFields>
            name="avatarUrl"
            label="Avatar URL"
            id="avatar"
            placeholder="Add your image url"
            defaultValue={user?.avatarUrl || ""}
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-4">
        <FormInput<ProfileFormFields>
          name="firstName"
          label="FirstName"
          id="firstName"
          error={state?.errors?.firstName && state.errors.firstName[0]}
          placeholder="Enter your firstName"
          defaultValue={user?.firstName}
        />
        <FormInput<ProfileFormFields>
          name="lastName"
          label="LastName"
          id="lastName"
          placeholder="Enter your lastName"
          error={state?.errors?.lastName && state.errors.lastName[0]}
          defaultValue={user?.lastName}
        />
      </div>
      <FormInput<ProfileFormFields>
        name="email"
        label="Email"
        id="email"
        error={state?.errors?.email && state.errors.email[0]}
        placeholder="Enter your email"
        defaultValue={user?.email}
      />
      <input type="hidden" name="id" value={user.id} />
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          className="inline-block px-4 py-2 rounded-sm leading-[143%] text-white bg-black font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isChanged || isPending}
        >
          Save all changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
