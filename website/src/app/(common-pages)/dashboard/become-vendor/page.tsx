"use client";

import Input from "@/src/components/forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const BecomeVendorPage = () => {
  let vendorRegistrationSchema = object({
    shop_name: string().required("Email is required"),
    shop_url: string().required("Email is required"),
    phone: string().required("Email is required"),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(vendorRegistrationSchema) });

  const handelFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="page-title">Become Vendor</h3>
      <form className="ps-form--account-setting" onSubmit={handleSubmit(handelFormSubmit)}>
        <div className="ps-form__content">
          <div className="form-group">
            <label className="required">Shop Name</label>
            <Input register={register} name="shop_name" isRequired={true} errors={errors} placeholder="Your Shop Name" type="text" />
          </div>
          <div className="form-group shop-url-wrapper">
            <label className="required float-left">Shop URL</label>
            <span className="d-inline-block float-right shop-url-status" />
            <Input register={register} name="shop_url" isRequired={true} errors={errors} placeholder="Your Shop Url" type="text" />
            <span className="d-inline-block">
              <small>https://martfury.botble.com/stores</small>
            </span>
          </div>
          <div className="form-group">
            <label className="required">Phone Number</label>
            <Input register={register} name="phone" isRequired={true} errors={errors} placeholder="Your Phone" type="text" />
          </div>
          <div className="form-group submit">
            <button className="ps-btn" type="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BecomeVendorPage;
