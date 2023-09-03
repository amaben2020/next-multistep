const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <form
      className="p-4 mx-auto border border-gray-500 w-1/2 flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
