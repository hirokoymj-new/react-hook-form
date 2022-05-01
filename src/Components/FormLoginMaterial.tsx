import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Container,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Checkbox,
  FormLabel,
} from "@material-ui/core";

type FormInputs = {
  firstName: string;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
};

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name"),
    email: yup.string().email().required("Please fill in your email!!"),
    password: yup.string().min(4).max(10),
    gender: yup.string().required(),
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
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
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      gender: "",
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  console.log(watch("email"));
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          // defaultValue="Hiroko"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="First Name"
              variant="outlined"
              helperText={errors.firstName ? errors.firstName.message : ""}
              error={!!errors.firstName}
            />
          )}
        />
        <br />
        <br />
        <Controller
          name="email"
          control={control}
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
        <FormControl
          error={errors.gender ? true : false}
          style={{ width: "100%" }}>
          <FormLabel htmlFor="gender">Gender:</FormLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} variant="outlined">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
        <br />
        <br />
        <FormControl
          style={{ width: "100%" }}
          error={errors.acceptTerms ? true : false}>
          <FormLabel component="legend">Accept Terms and Conditions</FormLabel>
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
          <FormHelperText>{errors.acceptTerms?.message}</FormHelperText>
        </FormControl>
        <div>
          <input type="submit" />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
    </Container>
  );
};
