import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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

enum ColorsEnum {
  white = "white",
  red = "red",
}
interface FormInputs {
  acceptTerms: boolean;
  attend: boolean;
  colors: string[]; // multiple checkboxes
}

const formSchema = yup
  .object({
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Terms and Conditions is required"),
    attend: yup.boolean().oneOf([true], "attend is required"),
    colors: yup.array().min(1).of(yup.string().required("Color is required")),
  })
  .required();

export const FormCheckboxMUI = () => {
  const defaultColors = ["white"];
  const [checkedValues, setCheckedValues] = useState(defaultColors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      acceptTerms: false,
      attend: false,
      colors: defaultColors,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  // const handleChange = (e: any) => {
  //   const newVal = e.target.value;
  //   const checked = e.target.checked;
  //   console.log(checked);
  //   console.log(newVal);
  // };

  // function handleSelect(e: any) {
  //   // console.log("handleSelect");
  //   // console.log(e.target.value);
  //   const checkedName = e.target.value as string;
  //   const newNames = checkedValues?.includes(checkedName)
  //     ? checkedValues?.filter((name) => name !== checkedName)
  //     : [...(checkedValues ?? []), checkedName];
  //   setCheckedValues(newNames);

  //   return newNames;
  // }

  const handleCheckbox = (e: any) => {
    console.log("handleCheckbox");
    const newVal = e.target.value as string;
    const newNames = checkedValues?.includes(newVal)
      ? checkedValues?.filter((name) => name !== newVal)
      : [...checkedValues, newVal];
    setCheckedValues(newNames);

    return newNames;
  };

  return (
    <div>
      <h2>Form - Checkbox</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>
            Terms and Conditions
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
              )}
            />
          </label>
          <FormHelperText>{errors.acceptTerms?.message}</FormHelperText>
        </section>
        <section>
          <FormControl error={!!errors.attend} style={{ width: "100%" }}>
            <FormGroup row>
              <Controller
                name="attend"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Attend a party"
                  />
                )}
              />
            </FormGroup>
            <FormHelperText>{errors.attend?.message}</FormHelperText>
          </FormControl>
        </section>
        <section>
          <FormGroup row>
            <Controller
              name="colors"
              control={control}
              render={({ field }) => {
                // console.log("field", field.value);
                // console.log("checked", field.value.includes("white"));
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => field.onChange(handleCheckbox(e))}
                        checked={field.value.includes("white")}
                        value="white"
                      />
                    }
                    label="White"
                  />
                );
              }}
            />
            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      onChange={(e) => field.onChange(handleCheckbox(e))}
                      checked={field.value.includes("red")}
                      value="red"
                    />
                  }
                  label="red"
                />
              )}
            />
          </FormGroup>
        </section>

        <hr />
        <input type="submit" />
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
      <pre>{JSON.stringify(getValues().colors)}</pre>
    </div>
  );
};
//https://react-hook-form.com/get-started#IntegratingwithUIlibraries
//https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/Mui.js:1265-1604
// https://codesandbox.io/s/material-demo-54nvi?file=/demo.js:1218-1242
