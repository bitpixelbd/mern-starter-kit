"use client";
import Input from "@/src/components/forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const page = () => {
  let accountInfoSchema = object({
    name: string().required("Email is required"),
    date_of_birth: string().required("Email is required"),
    email: string().required("Email is required"),
    phone: string().required("Email is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(accountInfoSchema) });

  const handelFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="panel-heading">
        <h3 className="page-title">Account information</h3>
      </div>
      <form onSubmit={handleSubmit(handelFormSubmit)}>
        <input className="form-control" name="_token" type="hidden" defaultValue="FB7umKsvhCifaFL8kLevJXkodFL884872Bcz1g7J" />
        <div className="form-group mb-3">
          <label className="form-label">Full Name:</label>
          <Input register={register} name="name" isRequired={true} errors={errors} placeholder="Your Full Name" type="text" />
        </div>
        <div className="form-group mb-3 ">
          <label className="form-label">Date of birth:</label>
          <Input register={register} name="date_of_birth" isRequired={true} errors={errors} placeholder="date of birth" type="text" />
        </div>
        <div className="form-group mb-3 ">
          <label className="form-label">Email:</label>
          <Input register={register} name="email" isRequired={true} errors={errors} placeholder="Your email" type="email" />
        </div>
        <div className="form-group mb-3 ">
          <label className="form-label">Phone:</label>
          <Input register={register} name="phone" isRequired={true} errors={errors} placeholder="Your phone" type="text" />
        </div>
        <div className="form-group">
          <button className="ps-btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
