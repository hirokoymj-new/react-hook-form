import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Grid, Container, Button } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IFormInputs = {
  firstName: string;
};

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
  })
  .required();

export const FormMaterialBasic = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "", // reset({}) works if there is defaultValues here!
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    alert(JSON.stringify(data));
    reset({}); // Reset all fields if defaultValues defines in useForm
  };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "50%", margin: "8px" }}>
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "50%", margin: "8px" }}
            onClick={() => {
              console.log("reset");
              reset({ firstName: "" });
            }}>
            Reset
          </Button>
        </form>
        <pre>{JSON.stringify(getValues())}</pre>
      </Grid>
    </Container>
  );
};
