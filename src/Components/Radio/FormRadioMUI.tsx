import React, { useEffect } from "react";
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
    formState: { errors, isDirty, isSubmitSuccessful },
    getValues,
    control,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      gender: "",
      // gender: "female", // Tested UI with the default value "male"
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ gender: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  console.log("isDirty", isDirty);
  return (
    <Container maxWidth="sm">
      <h2>Form - Radio button</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={!!errors.gender && isDirty}>
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
          <FormHelperText>
            {errors?.gender && isDirty && errors.gender?.message}
          </FormHelperText>
        </FormControl>
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
      <pre>{JSON.stringify(getValues())}</pre>
    </Container>
  );
};

//https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw?file=/src/index.tsx:968-982
