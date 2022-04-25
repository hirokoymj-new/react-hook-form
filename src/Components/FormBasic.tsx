import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

type Inputs = {
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  gender: GenderEnum;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().min(18).max(30).required(),
    password: yup.string().min(4).max(20).required(),
  })
  .required();

export const FormBasic = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  console.log(watch("firstName"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} />
          <p>{errors.firstName?.message}</p>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input {...register("lastName")} />
          <p>{errors.lastName?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" {...register("age")} />
          <p>{errors.age?.message}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <input type="submit" />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
    </div>
  );
};
