import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Select,
  Container,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormGroup,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import "../App.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   flexGrow: 1,
    // },
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

enum GenderEnum {
  female = "Female",
  male = "Male",
}

enum ColorsEnum {
  white = "white",
  red = "red",
}

type FormInputs = {
  gender: GenderEnum | ""; //Dropdown
  colors: ColorsEnum[]; // multiple checkboxes
  acceptTerms: boolean; //A single checkbox
  drink: string; // Radio
};

const formSchema = yup
  .object({
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    colors: yup.array().min(1).of(yup.string().required("Color is required")),
    gender: yup.string().required("Gender is required field."),
  })
  .required();

export const FormDropdownCheckboxRadioUI = () => {
  const classes = useStyles();

  const methods = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      colors: [], // Must be initialized with array to avoid showing an error when submit without touch color checkbox
      gender: "",
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  // console.log(errors);
  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <h2>
          Form - Dropdown, Checkbox/Multiple Checkboxes and Radio with
          validation and Material
        </h2>
      </Grid>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <FormControl
              className={classes.formControl}
              error={methods.formState.errors?.gender ? true : false}>
              <InputLabel htmlFor="age-helper">Gender</InputLabel>
              <Select {...methods.register("gender")} variant="outlined">
                {Object.values(GenderEnum).map((gender) => (
                  <MenuItem value={gender} key={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {methods.formState.errors.gender?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={classes.formControl}
              error={methods.formState.errors?.acceptTerms ? true : false}>
              <FormLabel component="legend">
                Accept Terms and Conditions
              </FormLabel>
              <FormControlLabel
                control={<Checkbox {...methods.register("acceptTerms")} />}
                label="Accept"
              />
              <FormHelperText>
                {methods.formState.errors.acceptTerms?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              className={classes.formControl}
              error={methods.formState.errors?.colors ? true : false}>
              <FormLabel component="legend">Colors</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox {...methods.register("colors")} />}
                  label="white"
                  value="white"
                />
                <FormControlLabel
                  control={<Checkbox {...methods.register("colors")} />}
                  label="red"
                  value="red"
                />
              </FormGroup>
              <FormHelperText>
                {" "}
                {methods.formState.errors?.colors &&
                  (methods.formState.errors?.colors as any).message}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* <div>
            <label className="form-label">Favorites:</label>
            <label>
              Coffee:
              <input
                type="radio"
                value="coffee"
                {...methods.register("favorite")}
              />
            </label>
            <label>
              Tea:
              <input
                type="radio"
                value="tea"
                {...methods.register("favorite")}
              />
            </label>
          </div> */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}>
              Submit
            </Button>
          </Grid>
        </form>
        <pre>{JSON.stringify(methods.getValues())}</pre>
      </FormProvider>
    </Container>
  );
};
