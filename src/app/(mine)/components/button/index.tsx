const Button = ({ children, ...props }: { children: React.ReactNode }) => {
  console.log("props", props);
  return <button {...props}>{children}</button>;
};

export default Button;
