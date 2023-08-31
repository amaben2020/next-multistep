const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
}) => {
  return (
    <form className="p-4" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;
