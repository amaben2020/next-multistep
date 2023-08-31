"use client";

import { useState } from "react";
import PaymentInformationForm from "../components/payment-info";
import ShippingDetailsForm from "../components/shipping-info";
import UserInformationForm from "../components/user-info";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserInformationForm onNext={handleNext} />;
      case 2:
        return <ShippingDetailsForm onNext={handleNext} />;
      case 3:
        return <PaymentInformationForm onConfirm={handleNext} />;
      default:
        return null;
    }
  };

  console.log("renderStep()", renderStep());

  return (
    <div>
      <h1>Checkout</h1>
      {renderStep()}
    </div>
  );
};

export default CheckoutPage;
