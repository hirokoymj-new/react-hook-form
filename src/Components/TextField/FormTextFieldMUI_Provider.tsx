import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Container } from "@material-ui/core";
import { DevTool } from "@hookform/devtools";

interface IFormInputs {
  firstName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
  })
  .required();

export const FormTextFieldMUI_Provider = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <section>
            <TextField
              type="text"
              label="First Name"
              variant="outlined"
              error={!!methods.formState.errors.firstName}
              helperText={methods.formState.errors.firstName?.message ?? ""}
              fullWidth
              defaultValue="Hiroko"
              margin="normal"
              {...methods.register("firstName")}
            />
          </section>
          <input type="submit" />
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Container>
  );
};

//https://react-hook-form.com/dev-tools
// https://react-hook-form.com/advanced-usage#FormProviderPerformance
//　https://v4.mui.com/api/text-field/
