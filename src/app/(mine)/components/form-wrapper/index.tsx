const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
}) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default FormWrapper;
