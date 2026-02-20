"use client";
import z from "zod";
import { authScheme } from "@/utils/authValidation";
import { useRef, useState } from "react";
import { MemberUser } from "@/utils/types";
import Image from "next/image";
import FormInput from "@/components/Input/FormInput";
import Button from "@/components/Button/Button";

type ProfileFormFields = Omit<
  z.infer<typeof authScheme>,
  "login" | "password"
> & { avatar?: File };

const ProfileEditForm = ({ user }: { user: MemberUser }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [photo, setPhoto] = useState<null | File>(null);
  const initialData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOnChange = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const currentValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      avatar: formData.get("avatar") as File,
    };

    if (currentValues.avatar && currentValues.avatar.size > 0) {
      setPhoto(currentValues.avatar);
      setIsChanged(true);
      return;
    }

    const changed =
      currentValues.firstName !== initialData.firstName ||
      currentValues.lastName !== initialData.lastName ||
      currentValues.email !== initialData.email;

    setIsChanged(changed);
  };

  return (
    <form
      ref={formRef}
      onChange={handleOnChange}
      className="flex-1 flex flex-col gap-y-4"
    >
      <div className="">
        <h3 className="text-sm leading-[143%] text-gray-500 font-medium">
          My picture
        </h3>
        <div className="mt-4 flex justify-start items-center gap-x-8">
          <div className="relative">
            <Image
              src={user?.avatarUrl || "/images/no-avatar.png"}
              alt={`${user?.firstName} avatar`}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <label
            htmlFor="profile-picture"
            className="relative inline-block px-4 py-2 rounded-sm leading-[143%] text-white bg-black font-medium cursor-pointer"
          >
            Change picture
            <input
              id="profile-picture"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="absolute opacity-0"
            />
          </label>
          {photo && <p>{photo.name}</p>}
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-4">
        <FormInput
          name="firstName"
          label="FirstName"
          id="firstName"
          placeholder="Enter your firstName"
          defaultValue={user?.firstName}
        />
        <FormInput
          name="lastName"
          label="LastName"
          id="lastName"
          placeholder="Enter your lastName"
          defaultValue={user?.lastName}
        />
      </div>
      <FormInput
        name="email"
        label="Email"
        id="email"
        placeholder="Enter your email"
        defaultValue={user?.email}
      />
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          className="inline-block px-4 py-2 rounded-sm leading-[143%] text-white bg-black font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isChanged}
        >
          Save all changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
