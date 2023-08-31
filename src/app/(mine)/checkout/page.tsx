"use client";

import { useState } from "react";
import UserDetails from "../layout/UserDetails";

const Checkout = () => {
  const [step, setStep] = useState(1);

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
        return <>2</>;

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
