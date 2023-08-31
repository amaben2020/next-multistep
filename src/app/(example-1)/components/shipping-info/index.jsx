"use client";

import { useState } from "react";
import { shippingDetailsSchema } from "../../../utils/schemas/shipping-details";
import { z } from "zod";

const ShippingDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    shippingMethod: "standard",
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
      const validatedData = shippingDetailsSchema.parse(formData);
      console.log("Valid shipping details:", validatedData);
      setErrors({});
      onNext(); // Move on to the next step
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten());
      }
    }
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div>
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && (
          <span className="error">{errors.postalCode}</span>
        )}
      </div>
      <div>
        <label>Shipping Method</label>
        <select
          name="shippingMethod"
          value={formData.shippingMethod}
          onChange={handleChange}
        >
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default ShippingDetailsForm;
