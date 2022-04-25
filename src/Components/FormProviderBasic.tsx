import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Select,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { SchemaOf, string, object, array } from "yup";
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
  age: string;
  // category: string;
}

const formSchema: SchemaOf<IFormProps> = object({
  name: string().required("Name is required"),
  age: string().required("Age is required"),
  // category: string().optional(),
});

export const FormProviderBasic = () => {
  const classes = useStyles();

  const methods = useForm<IFormProps>({
    resolver: yupResolver(formSchema),
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
              {/* <FormTextField label="Name" name="name" /> */}
              <TextField
                label="Name"
                variant="outlined"
                error={!!methods.formState.errors.name}
                helperText={methods.formState.errors.name?.message ?? ""}
                fullWidth
                margin="dense"
                {...methods.register("name")}
              />
            </Grid>
            <Grid>
              <FormControl>
                <InputLabel htmlFor="age-helper">Age</InputLabel>
                <Select
                  {...methods.register("age")}
                  variant="outlined"
                  fullWidth>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="10">Ten</MenuItem>
                  <MenuItem value="20">Twenty</MenuItem>
                  <MenuItem value="30">Thirty</MenuItem>
                </Select>
                <FormHelperText>
                  {methods.formState.errors.age?.message ?? ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* <Grid>
              <FormDropdown name="category" label="category" />
            </Grid> */}
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
