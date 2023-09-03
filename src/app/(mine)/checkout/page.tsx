"use client";

import { useState } from "react";
import PaymentDetail from "../layout/PaymentDetails";
import Result from "../layout/Result";
import ShippingDetail from "../layout/ShippingDetails";
import UserDetails from "../layout/UserDetails";

const Checkout = () => {
  const [step, setStep] = useState(3);

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
        return <PaymentDetail onNext={handleStep} step={step} />;

      case 4:
        return <Result />;

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
