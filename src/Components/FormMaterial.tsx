import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  TextField: string;
  MyCheckbox: boolean;
  firstName: string;
}

export const FormMaterial = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue="Hiroko"
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} />}
      />
      {errors.firstName && "First name is required"}
      <br />
      <Controller
        name="MyCheckbox"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <br />

      <input type="submit" />
    </form>
  );
};
