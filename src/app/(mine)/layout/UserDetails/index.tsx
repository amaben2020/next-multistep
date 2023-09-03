import { userInfoSchema } from "@/app/utils/schemas/user-details";
import { useState } from "react";
import { z } from "zod";
import Button from "../../components/button";
import ErrorComponent from "../../components/error";
import FormWrapper from "../../components/form-wrapper";
import Input from "../../components/input-group";

export type TFormComponent = {
  onNext: () => void;
  step: number;
};
const UserDetails = ({ onNext, step }: TFormComponent) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const [error, setError] = useState<{
    fieldErrors: {
      contactNumber: string;
      name: string;
      email: string;
    };
    hasErrors: boolean;
  }>({
    fieldErrors: {
      contactNumber: "",
      name: "",
      email: "",
    },

    hasErrors: false,
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
      const isValid = userInfoSchema.parse(formData);
      console.log("isValid", isValid);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "formData",
          JSON.stringify({
            ...isValid,
          }),
        );
      }
      setError({
        fieldErrors: {
          contactNumber: "",
          name: "",
          email: "",
        },
        hasErrors: false,
      });
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError((p) => ({
          ...p,
          fieldErrors: {
            contactNumber: error?.flatten().fieldErrors["contactNumber"],
            name: error?.flatten().fieldErrors["name"],
            email: error?.flatten().fieldErrors["email"],
          },
          hasErrors: true,
        }));
        console.log(error.flatten());
      }
    }
  };

  const renderError = ({ fieldErrors }: any, name: any) => {
    return (
      <ErrorComponent
        message={
          Array.isArray(fieldErrors[name])
            ? fieldErrors[name][0]
            : fieldErrors[name]
        }
      />
    );
  };

  const disableButton =
    formData.contactNumber.length === 0 ||
    formData.name.length === 0 ||
    formData.email.length === 0;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2 className="my-4">UserDetails Step: {step}</h2>

      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          onChange={handleChange}
          name="name"
          value={formData.name}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
        {renderError(error, "name")}
        <Input
          label="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
        {renderError(error, "email")}
        <Input
          label="Contact Number"
          onChange={handleChange}
          name="contactNumber"
          value={formData.contactNumber}
          className="w-1/1 my-3 p-2 rounded-sm text-black"
          type="text"
        />
        {renderError(error, "contactNumber")}
      </div>
      <Button
        disabled={disableButton}
        className="bg-green-500 p-2 mt-3 disabled:bg-green-200"
        type="submit"
      >
        Next
      </Button>
    </FormWrapper>
  );
};

export default UserDetails;
