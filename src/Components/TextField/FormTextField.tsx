import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInputs = {
  firstName: string;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
  })
  .required();

export const FormTextField = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  console.log(watch("firstName"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">FirstName</label>
          <input defaultValue="" {...register("firstName")} />
          <p className="error">
            {errors.firstName && errors.firstName.message}
          </p>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
//https://react-hook-form.com/get-started#Quickstart
