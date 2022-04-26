import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
enum ColorEnum {
  white = "white",
  red = "red",
}

interface IFormInputs {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
  colors: ColorEnum[];
}

export const FormQuickStart = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("onSubmit");
    console.log(data);
  };
  console.log(watch("firstName"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name:</label>
          <input
            {...register("firstName", { required: true, maxLength: 20 })}
          />
          {errors.firstName && "First name is required"}
        </div>
        <div>
          <label>Last Name:</label>
          <input {...register("lastName", { required: true })} />
          {errors.lastName && "Last name is required"}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" {...register("age", { min: 18, max: 99 })} />
        </div>
        <div>
          <label>Gender:</label>
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label>Colors:</label>
          <label key="white">
            <input type="checkbox" value="white" {...register("colors")} />
            white
          </label>
          <label key="red">
            <input type="checkbox" value="red" {...register("colors")} />
            red
          </label>
        </div>
        <input type="submit" />
      </form>
      <hr />
      <h3>Print form values</h3>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};
