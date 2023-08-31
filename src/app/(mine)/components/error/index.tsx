const ErrorComponent = ({ message }: { message: string }) => {
  return <div className="text-xl text-red-700">{message}</div>;
};

export default ErrorComponent;
