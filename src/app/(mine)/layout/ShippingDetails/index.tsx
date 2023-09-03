import { useState } from "react";
import { z } from "zod";
import { shippingDetailsSchema } from "../../../utils/schemas/shipping-details";
import Button from "../../components/button";
import ErrorComponent from "../../components/error";
import FormWrapper from "../../components/form-wrapper";
import Input from "../../components/input-group";
import { TFormComponent } from "../UserDetails";

const ShippingDetail = ({ onNext, step }: TFormComponent) => {
  // here, we upload the image and send to cloudinary

  const INITIAL_STATE = {
    address: "",
    city: "",
    postalCode: 11111,
    shippingMethod: "standard",
  };

  const shippingMethods = ["standard", "express"];

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState<{
    fieldErrors: {
      postalCode: string;
      address: string;
      shippingMethod: string;
      city: string;
    };
  }>({
    fieldErrors: {
      postalCode: "",
      address: "",
      shippingMethod: "",
      city: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((previousValue) => ({
      ...previousValue,
      [name]: value,
      postalCode: Number(value),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      const SCHEMA = shippingDetailsSchema.safeParse(formData);
      console.log("SCHEMA", SCHEMA);

      if (SCHEMA.success) {
        onNext();
      } else if (SCHEMA.error) {
        setError({
          fieldErrors: {
            postalCode: "eRRROR",
            address: "",
            shippingMethod: "",
            city: "",
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

  const renderError = (
    name: "postalCode" | "address" | "city" | "shippingMethod",
  ) => {
    const schemaError = Array.isArray(error?.fieldErrors[name])
      ? error?.fieldErrors[name][0]
      : error?.fieldErrors[name];

    return <ErrorComponent message={schemaError} />;
  };

  return (
    <div>
      ShippingDetail : {step}
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="address"
          label="address"
          type="text"
          value={formData.address}
        />
        {renderError("address")}
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="city"
          label="city"
          type="text"
          value={formData.city}
        />
        {renderError("city")}
        <Input
          className="text-black py-3 outline-none"
          onChange={handleChange}
          name="postalCode"
          value={Number(formData.postalCode)}
          label="Postal Code"
          type="number"
        />
        {renderError("postalCode")}
        <select
          onChange={handleChange}
          defaultValue={shippingMethods[0]}
          className="text-black py-3 outline-none"
          name="shippingMethod"
          value={formData.shippingMethod}
        >
          {shippingMethods.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
        {renderError("shippingMethod")}
        <Button>Next</Button>
      </FormWrapper>
      {/* <UploadForm /> */}
    </div>
  );
};

export default ShippingDetail;
