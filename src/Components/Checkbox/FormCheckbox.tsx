import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormInputs {
  acceptTerms: boolean; //A single checkbox
}

const formSchema = yup
  .object({
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Terms and Conditions is required"),
  })
  .required();

export const FormCheckbox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div>
      <h2>Form - Checkbox</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label key="acceptTerms">
            <b>Accept Terms and Conditions:</b>
            <input type="checkbox" {...register("acceptTerms")} />
            <p className="error">{errors.acceptTerms?.message}</p>
          </label>
        </div>
        <hr />
        <input type="submit" />
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};
