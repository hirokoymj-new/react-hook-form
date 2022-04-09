import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const FormBasic = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return <h1>TEST</h1>;
};
