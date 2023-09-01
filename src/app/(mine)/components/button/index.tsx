import { ComponentProps } from "react";

interface IButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
}
const Button = ({ children, ...props }: IButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default Button;
