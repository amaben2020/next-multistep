"use client";

import { useState } from "react";
import ShippingDetail from "../layout/ShippingDetails";
import UserDetails from "../layout/UserDetails";

const Checkout = () => {
  const [step, setStep] = useState(2);

  const handleStep = () => setStep((p) => p + 1);

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <UserDetails onNext={handleStep} step={step} />
          </>
        );

      case 2:
        return <ShippingDetail onNext={handleStep} step={step} />;

      case 3:
        return <>3</>;

      default:
        break;
    }
  };

  return (
    <div className="p-6">
      Checkout
      {renderForm()}
    </div>
  );
};

export default Checkout;
