import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControl,
  FormHelperText,
  Container,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
      marginBottom: theme.spacing(3),
    },
    submitBtn: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  })
);

interface FormInputs {
  acceptTerms: boolean;
}

const formSchema = yup
  .object({
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Terms and Conditions is required"),
  })
  .required();

export const FormCheckboxMUI_Provider = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const methods = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      acceptTerms: true,
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  console.log(methods.formState.errors);
  console.log(methods);
  return (
    <Container maxWidth="sm">
      <h2>Form - Checkbox(es)</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormControl
            className={classes.formControl}
            error={!!methods.formState.errors?.acceptTerms}>
            <FormLabel component="legend">Terms and Conditions</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  {...methods.register("acceptTerms")}
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label="Accept"
            />
            <FormHelperText>
              {methods.formState.errors.acceptTerms?.message}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitBtn}>
            Submit
          </Button>
        </form>
      </FormProvider>
      <pre>{JSON.stringify(methods.getValues())}</pre>
      {methods.getValues("acceptTerms")}
    </Container>
  );
};
