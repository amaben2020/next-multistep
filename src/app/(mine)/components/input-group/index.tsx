import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: IInput) => {
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} />
    </>
  );
};

export default Input;
