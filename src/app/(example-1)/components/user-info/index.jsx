"use client";
import { useState } from "react";
import { z } from "zod";
import { userInfoSchema } from "../../../utils/schemas/user-details";

const UserInformationForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = userInfoSchema.parse(formData);
      console.log("Valid user info:", validatedData);
      setErrors({});
      onNext(); // Proceed to the next step
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten());
      }
    }
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
      {/* Form fields and error handling */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />

      <button className="border bg-green-500 p-3">Next</button>
    </form>
  );
};

export default UserInformationForm;
