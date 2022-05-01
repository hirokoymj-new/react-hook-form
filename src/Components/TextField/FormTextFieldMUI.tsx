import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Container } from "@material-ui/core";

interface IFormInputs {
  firstName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
  })
  .required();

export const FormTextFieldMUI = () => {
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Controller
            name="firstName"
            control={control}
            defaultValue="Hiroko"
            // render={({ field: { onChange, value }, fieldState: { error } }) => (
            render={({ field, fieldState: { error } }) => (
              <TextField
                // onChange={onChange}
                // value={value}
                {...field}
                type="text"
                fullWidth
                label="First name"
                variant="outlined"
                margin="normal"
                helperText={error ? error.message : null}
                error={!!error} //Converts Object to boolean
              />
            )}
          />
        </section>
        <input type="submit" />
      </form>
    </Container>
  );
};
//https://react-hook-form.com/get-started#IntegratingControlledInputs
// Use the Controller component, which will take care of the registration process.
//https://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript#:~:text=operator%20twice.,-It%20may%20be&text=It%20converts%20a%20nonboolean%20to,5%20would%20be%20true).
