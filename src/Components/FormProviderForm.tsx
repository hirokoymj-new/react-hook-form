import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
// import { SchemaOf, string, object, array } from "yup";
import * as yup from "yup";
import FormTextField from "Inputs/FormTextField";
import FormDropdown from "Inputs/FormDropdown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
    },
  })
);

interface IFormProps {
  name: string;
  message: string;
  lastName: string;
  age: string;
}

// const formSchema: SchemaOf<IFormProps> = object({
//   name: string().required("Name is required"),
//   message: string().required("Message is required"),
//   lastName: string().required("Last name is required"),
// });

const formSchema = yup.object().shape({
  name: yup.string().required(),
  message: yup.string().required(),
  lastName: yup.string().optional(),
  age: yup.string().required(),
});

const options = [
  {
    label: "age 10",
    value: "10",
  },
  {
    label: "age 20",
    value: "20",
  },
];

export const FormProviderForm = () => {
  const classes = useStyles();

  const methods = useForm<IFormProps>({
    resolver: yupResolver(formSchema),
    defaultValues: { name: "HIROKO", message: "Go US", age: "20" },
  });

  const submitRecipe: SubmitHandler<IFormProps> = async (data: IFormProps) => {
    console.log("data submitted", data);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitRecipe)}>
            <Grid item>
              <FormTextField label="Name" name="name" />
            </Grid>
            <Grid item>
              <FormTextField label="Message" name="message" />
            </Grid>
            <Grid item>
              <FormTextField label="Last" name="lastName" />
            </Grid>
            <Grid>
              <FormDropdown
                name="age"
                label="Age"
                options={options}
                // disabled={true}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </div>
  );
};
