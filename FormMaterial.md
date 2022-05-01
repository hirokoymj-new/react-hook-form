# Integrating Material UI plus Yup validation

```js
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Grid, Container, Button } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IFormInputs = {
  firstName: string,
};

const schema = yup
  .object({
    firstName: yup.string().required("Please fill in your first name."),
  })
  .required();

export const FormMaterial = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm <
  IFormInputs >
  {
    resolver: yupResolver(schema),
  };
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            // rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                fullWidth
                label="First name"
                variant="outlined"
                helperText={errors.firstName && errors.firstName?.message}
                error={!!errors.firstName}
              />
            )}
          />
          // <button type="button" onClick={() => reset()}>
            // Reset //{" "}
          </button>
        </form>
        <pre>{JSON.stringify(getValues())}</pre>
      </Grid>
    </Container>
  );
};
```
