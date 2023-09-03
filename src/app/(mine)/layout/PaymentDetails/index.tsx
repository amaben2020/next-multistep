import { useState } from "react";
import { z } from "zod";
import { paymentInfoSchema } from "../../../utils/schemas/payment-details";
import Button from "../../components/button";
import ErrorComponent from "../../components/error";
import FormWrapper from "../../components/form-wrapper";
import Input from "../../components/input-group";
import { TFormComponent } from "../UserDetails";

const PaymentDetail = ({ onNext, step }: TFormComponent) => {
  // here, we upload the image and send to cloudinary

  const INITIAL_STATE = {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState<{
    fieldErrors: {
      cvv: string;
      cardNumber: string;
      expirationDate: string;
    };
  }>({
    fieldErrors: {
      cvv: "",
      cardNumber: "",
      expirationDate: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      const SCHEMA = paymentInfoSchema.safeParse(formData);

      if (SCHEMA.success) {
        if (typeof window !== undefined) {
          sessionStorage.setItem(
            "formDataPayment",
            JSON.stringify(SCHEMA.data),
          );
        }
        onNext();
      } else if (SCHEMA.error) {
        setError({
          fieldErrors: {
            cvv: "eRRROR",
            cardNumber: "",
            expirationDate: "",
          },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.flatten());
        console.log(error.flatten());
      }
    }
  };

  console.log("error?.fieldErrors", error?.fieldErrors);

  const renderError = (name: "cvv" | "cardNumber" | "expirationDate") => {
    const schemaError = Array.isArray(error?.fieldErrors[name])
      ? error?.fieldErrors[name][0]
      : error?.fieldErrors[name];

    return <ErrorComponent message={schemaError} />;
  };

  return (
    <div>
      PaymentDetail : {step}
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="cardNumber"
          label="cardNumber"
          type="text"
          value={formData.cardNumber}
        />
        {renderError("cardNumber")}
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="expirationDate"
          label="Expiration Date"
          type="text"
          value={formData.expirationDate}
        />
        {renderError("expirationDate")}
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="cvv"
          value={formData.cvv}
          label="CVV"
          type="number"
        />
        {renderError("cvv")}

        <Button>Next</Button>
      </FormWrapper>
      {/* <UploadForm /> */}
    </div>
  );
};

export default PaymentDetail;
