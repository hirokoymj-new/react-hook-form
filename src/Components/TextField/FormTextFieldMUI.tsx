import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Container, Button } from "@material-ui/core";

interface IFormInputs {
  firstName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
  })
  .required();

export const FormTextFieldMUI = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isDirty },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  console.log("isDirty", isDirty);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => {
              console.log("error", error);
              return (
                <TextField
                  // onChange={onChange}
                  // value={value}
                  {...field}
                  type="text"
                  fullWidth
                  label="First name"
                  variant="outlined"
                  margin="normal"
                  helperText={error && isDirty && error.message}
                  error={!!error && isDirty} //Converts Object to boolean
                />
              );
            }}
          />
        </section>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "100%" }}>
          Submit
        </Button>
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          onClick={() => reset()}>
          Reset
        </Button>
      </form>
    </Container>
  );
};
//https://react-hook-form.com/get-started#IntegratingControlledInputs
// Use the Controller component, which will take care of the registration process.
//https://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript#:~:text=operator%20twice.,-It%20may%20be&text=It%20converts%20a%20nonboolean%20to,5%20would%20be%20true).
