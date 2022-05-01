import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Grid,
  Container,
  Button,
} from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// enum GenderEnum {
//   female = "female",
//   male = "male",
//   other = "other",
// }

type IFormInputs = {
  firstName: string;
  // lastName: string;
  // MyCheckbox: boolean;
  // age: number;
  // gender: GenderEnum;
};

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
    // lastName: yup.string().required(),
    // MyCheckbox: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    // gender: yup.string().required("gender is required."),
  })
  .required();

export const FormMaterial = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            // defaultValue="Hiroko"
            // rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                fullWidth
                label="First name"
                variant="outlined"
                helperText={errors.firstName && errors.firstName?.message}
                error={!!errors.firstName}
              />
            )}
          />
          {/* <br /> <br />
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
      /> */}
          <br />
          <input type="submit" />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>
        <pre>{JSON.stringify(getValues())}</pre>
      </Grid>
    </Container>
  );
};
