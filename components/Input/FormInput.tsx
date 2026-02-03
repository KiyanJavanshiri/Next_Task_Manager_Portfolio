import React, { type HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  placeholder: string;
  name: string;
  id: string;
  label: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
}

const FormInput = (props: FormInputProps) => {
  const { placeholder, name, id, label, error, type = "text" } = props;

  return (
    <fieldset>
      <label htmlFor={id}>
        <span>{label}</span>
        <input placeholder={placeholder} name={name} id={id} type={type} />
      </label>
      {error && <p>{error}</p>}
    </fieldset>
  );
};

export default FormInput;
