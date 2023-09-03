import { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";

const Result = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const formData = useCallback(() => {
    const sessionKeys = [
      "formDataPayment",
      "formData",
      "formDataShippingAndBilling",
    ];

    let responses = [];

    setLoading(true);

    if (typeof window !== undefined) {
      sessionKeys.forEach((key) => {
        const results = JSON.parse(sessionStorage.getItem(key) ?? "");
        responses.push({ ...results });
      });

      setResult([...responses]);
      setLoading(false);
    }
  }, []);

  const clearForms = () => {};

  useEffect(() => {
    formData();
  }, [formData]);

  return (
    <div className="mx-auto border border-green-500 max-w-lg p-6 my-3">
      {loading && <div> ...LOADING</div>}
      Results :<h2> Payment Details</h2>
      <p className="mb-4"> CNumber :{result[0]?.cardNumber}</p>
      <h2> User Details</h2>
      <p className="mb-4"> Name :{result[1]?.name} </p>
      <h2> Shipping Details</h2>
      <p className="mb-4"> Address :{result[2]?.address} </p>
      <Button>Clear Form</Button>
    </div>
  );
};

export default Result;
