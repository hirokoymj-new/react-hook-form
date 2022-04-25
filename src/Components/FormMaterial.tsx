import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

type IFormInputs = {
  firstName: string;
  lastName: string;
  MyCheckbox: boolean;
  age: number;
  gender: GenderEnum;
};

export const FormMaterial = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log("onSubmit");
    // console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        // defaultValue="Hiroko"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            fullWidth
            label="First name"
            variant="outlined"
            helperText={error ? "First name is required" : null}
            error={!!error}
          />
        )}
      />
      <br /> <br />
      <Controller
        name="lastName"
        control={control}
        // defaultValue="Yamaji"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            fullWidth
            label="last name"
            variant="outlined"
            helperText={error ? error.message : null}
            error={!!error}
          />
        )}
      />
      <br /> <br />
      <Controller
        name="age"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField type="number" {...field} />}
      />
      {errors.firstName && "Last name is required"}
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
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};
