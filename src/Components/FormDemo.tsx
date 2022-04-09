import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
  firstName: string;
  lastName: string;
  age: number;
};

export const FormExample = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>} */}
      <div>
        First Name:
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>First name is required</span>}
      </div>
      <div>
        Last Name:
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span>Last name is required</span>}
      </div>
      <div>
        Age:
        <input type="number" {...register("age", { min: 18, max: 25 })} />
        {errors.age && <span>Age range is 18-25.</span>}
      </div>

      <input type="submit" />
    </form>
  );
};

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}

export const FormRegister = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Gender Selection</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
};
