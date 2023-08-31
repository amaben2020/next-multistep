//@ts-nocheck

"use client";

import { useState } from "react";
import { paymentInfoSchema } from "../../../utils/schemas/payment-details";

const PaymentInformationForm = ({ onConfirm }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
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
      const validatedData = paymentInfoSchema.parse(formData);
      console.log("Valid payment info:", validatedData);
      setErrors({});
      onConfirm(); // Proceed to confirmation step
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        {errors.cardNumber && (
          <span className="error">{errors.cardNumber}</span>
        )}
      </div>
      <div>
        <label>Expiration Date</label>
        <input
          type="text"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
        />
        {errors.expirationDate && (
          <span className="error">{errors.expirationDate}</span>
        )}
      </div>
      <div>
        <label>CVV</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />
        {errors.cvv && <span className="error">{errors.cvv}</span>}
      </div>
      <button type="submit">Confirm Payment</button>
    </form>
  );
};

export default PaymentInformationForm;
