import React from "react";
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

interface FormInputs {
  gender: string;
}

const formSchema = yup
  .object({
    gender: yup.string().required(),
  })
  .required();

export const FormRadioMUI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div>
      <h2>Form - Radio button</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={!!errors.gender}>
          <FormLabel>Radio Group</FormLabel>
          <Controller
            render={({ field }) => (
              <RadioGroup aria-label="gender" {...field}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            )}
            name="gender"
            control={control}
          />
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
        <hr />
        <Button type="submit" variant="outlined" color="primary">
          Submit
        </Button>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};

//https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw?file=/src/index.tsx:968-982
//https://v4.mui.com/components/radio-buttons/#radio
