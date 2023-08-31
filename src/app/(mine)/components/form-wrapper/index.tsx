const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: any;
  onSubmit: () => void;
}) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default FormWrapper;
