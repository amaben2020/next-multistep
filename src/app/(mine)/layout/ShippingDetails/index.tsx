import { useState } from "react";
import Button from "../../components/button";
import UploadForm from "../../components/file-upload";
import FormWrapper from "../../components/form-wrapper";
import { TFormComponent } from "../UserDetails";

const ShippingDetail = ({ onNext, step }: TFormComponent) => {
  // here, we upload the image and send to cloudinary

  const INITIAL_STATE = {
    address: "",
    city: "",
    postalCode: "",
    shippingMethod: "standard",
  };

  const shippingMethods = ["standard", "express"];

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e: any) => {};
  const handleSelect = (e: any) => {};
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      ShippingDetail
      <FormWrapper onSubmit={() => {}}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <select
          onSelect={handleSelect}
          className="text-black py-3 outline-none"
        >
          {shippingMethods.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
        <Button>Next</Button>
      </FormWrapper>
      <UploadForm />
    </div>
  );
};

export default ShippingDetail;
