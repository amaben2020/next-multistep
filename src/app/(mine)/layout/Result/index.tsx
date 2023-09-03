import { useEffect, useState } from "react";

const Result = () => {
  const [result, setResult] = useState([]);
  const formData = () => {
    if (typeof window !== undefined) {
      const userDetails = JSON.parse(sessionStorage.getItem("formData") ?? "");
      const shippingDetails = JSON.parse(
        sessionStorage.getItem("formDataPayment") ?? "",
      );
      const paymentDetails = JSON.parse(
        sessionStorage.getItem("formDataShippingAndBilling") ?? "",
      );
      console.log("userDetails", userDetails);
      setResult([{ ...userDetails, ...shippingDetails, ...paymentDetails }]);
    }
  };

  useEffect(() => {
    formData();
  }, []);

  console.log("result", result);
  return (
    <div className="mx-auto border border-green-500 max-w-lg p-6 my-3">
      Result : {result[0]?.address} {result[0]?.name}
    </div>
  );
};

export default Result;
