import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
enum Colors {
  white = "White",
  red = "Red",
}

const colorValueArray = Object.values(Colors); //[ 'WHITE', 'BLACK', 'BLUE', 0, 1, 3 ]
console.log(colorValueArray);

const genderArray = Object.values(GenderEnum);
console.log(genderArray);

type Inputs = {
  firstName: string;
  email: string;
  age: number;
  gender: GenderEnum | "";
  colors: string[];
  acceptTerms: boolean;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup
      .string()
      .required("email is required")
      .email("Check an email format"),
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    colors: yup.array().min(1).of(yup.string().required("color is required")),
    gender: yup.string().required("gender is required."),
  })
  .required();

export const FormBasic = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
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
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" {...register("age")} />
          <p>{errors.age?.message}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select {...register("gender")}>
            <option value="">Select gender</option>
            {Object.values(GenderEnum).map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
            {/* <option value="">Select gender</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option> */}
          </select>
          <span>{errors.gender?.message}</span>
        </div>
        <div>
          <label htmlFor="acceptTerms">
            Accept Terms
            <input type="checkbox" {...register("acceptTerms")} />
            <span>{errors.acceptTerms?.message}</span>
          </label>
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
          <p>{errors.colors && (errors.colors as any).message}</p>
        </div>
        <input type="submit" />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};

enum ColorsEnum {
  white = "white",
  red = "red",
}

type FormExampleInputs = {
  gender: GenderEnum | ""; //Dropdown
  colors: ColorsEnum[]; // multiple checkboxes
  acceptTerms: boolean; //A single checkbox
};

const formExampleSchema = yup
  .object({
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    colors: yup.array().min(1).of(yup.string().required("Color is required")),
    gender: yup.string().required("gender is required."),
  })
  .required();

export const FormCheckboxDropdownExample = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormExampleInputs>({
    resolver: yupResolver(formExampleSchema),
    defaultValues: {
      ////colors must be a `array` type, but the final value was: `null`
      //{"gender":"","acceptTerms":false,"colors":false}
      colors: [], // Must be initialized with array to avoid showing an error when submit without touch color checkbox
    },
  });

  const onSubmit: SubmitHandler<FormExampleInputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="gender">Gender</label>
          <select {...register("gender")}>
            <option value="">Select gender</option>
            {Object.values(GenderEnum).map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
          <span>{errors.gender?.message}</span>
        </div>
        <div>
          <label htmlFor="acceptTerms">
            Accept Terms
            <input type="checkbox" {...register("acceptTerms")} />
            <span>{errors.acceptTerms?.message}</span>
          </label>
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
          <p>{errors.colors && (errors.colors as any).message}</p>
        </div>
        <input type="submit" />
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};
