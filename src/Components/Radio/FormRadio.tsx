import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormInputs {
  gender: string;
}

const formSchema = yup
  .object({
    gender: yup.string().required(),
  })
  .required();

export const FormRadio = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div>
      <h2>Form - Radio button</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label style={{ fontWeight: "bold", display: "block" }}>
            Gender:
          </label>
          <label>
            Male:
            <input type="radio" value="male" {...register("gender")} />
          </label>
          <label>
            Female:
            <input type="radio" value="female" {...register("gender")} />
          </label>
          <p className="error">{errors.gender?.message}</p>
        </div>
        <hr />
        <input type="submit" />
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};
