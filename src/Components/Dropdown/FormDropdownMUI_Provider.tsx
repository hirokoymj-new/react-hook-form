import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
  Container,
  FormLabel,
} from "@material-ui/core";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInputs {
  gender: GenderEnum | "";
}

const formSchema = yup
  .object({
    gender: yup.string().required("Gender is required."),
  })
  .required();

export const FormDropdownMUI_Provider = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      // gender: GenderEnum.female,
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormControl
            error={!!methods.formState.errors.gender}
            style={{ width: "100%" }}>
            <FormLabel>Gender</FormLabel>
            <Select {...methods.register("gender")} variant="outlined">
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText>
              {methods.formState.errors?.gender?.message}
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <div>
            <input type="submit" />
          </div>
        </form>
      </FormProvider>
      <pre>{JSON.stringify(methods.getValues())}</pre>
    </Container>
  );
};

//https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/Mui.js:2701-2715
//https://react-hook-form.com/get-started#IntegratingwithUIlibraries
