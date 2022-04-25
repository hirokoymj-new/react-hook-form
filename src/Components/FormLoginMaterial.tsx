import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@material-ui/core";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(4).max(20).required(),
  })
  .required();

export const FormLoginMaterial = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  console.log(watch("email"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue="Hiroko"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              variant="outlined"
              helperText={errors.email ? errors.email.message : ""}
              error={!!errors.email}
            />
          )}
        />
        <br></br>
        <br></br>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              variant="outlined"
              helperText={errors.password ? errors.password.message : ""}
              error={!!errors.password}
            />
          )}
        />
        <br></br>
        <br></br>

        <input type="submit" />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
    </div>
  );
};
