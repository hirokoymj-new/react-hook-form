import { useForm, SubmitHandler, Controller } from "react-hook-form";
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

export const FormDropdownMUI = () => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      // gender: GenderEnum.female,
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={!!errors.gender} style={{ width: "100%" }}>
          <FormLabel>Gender</FormLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} variant="outlined">
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>
            {errors.gender && errors.gender.message}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <div>
          <input type="submit" />
        </div>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </Container>
  );
};

//https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/Mui.js:2701-2715
//https://react-hook-form.com/get-started#IntegratingwithUIlibraries
