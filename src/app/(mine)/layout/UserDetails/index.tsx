import { useState } from "react";
import Button from "../../components/button";
import FormWrapper from "../../components/form-wrapper";

const UserDetails = ({
  onNext,
  step,
}: {
  onNext: () => void;
  step: number;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const handleChange = (e: any) => {
    const { value, name } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "formData",
          JSON.stringify({
            ...formData,
          }),
        );
      }
      onNext();
    } catch (error) {}
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      UserDetails Step: {step}
      <div className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          name="name"
          value={formData.name}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
        <input
          onChange={handleChange}
          name="contactNumber"
          value={formData.contactNumber}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
      </div>
      <Button className="bg-green-500 p-2 mt-3" type="submit">
        Next
      </Button>
    </FormWrapper>
  );
};

export default UserDetails;
