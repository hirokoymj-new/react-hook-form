import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../App.css";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

enum ColorsEnum {
  white = "white",
  red = "red",
}

type FormInputs = {
  gender: GenderEnum | ""; //Dropdown
  colors: ColorsEnum[]; // multiple checkboxes
  acceptTerms: boolean; //A single checkbox
  favorite: string; // Radio
};

const formSchema = yup
  .object({
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    colors: yup.array().min(1).of(yup.string().required("Color is required")),
    gender: yup.string().required("gender is required."),
  })
  .required();

export const FormDropdownCheckboxRadio = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      colors: [], // Must be initialized with array to avoid showing an error when submit without touch color checkbox
      favorite: "coffee",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  console.log(errors);
  return (
    <div>
      <h2>
        Form - Dropdown, Checkbox/Multiple Checkboxes and Radio with validation
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-label">Gender:</label>
          <select {...register("gender")}>
            <option value="">Select gender</option>
            {Object.values(GenderEnum).map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
          <p className="error">{errors.gender?.message}</p>
        </div>
        <div>
          <label key="acceptTerms">
            <b>Accept Terms and Conditions:</b>
            <input type="checkbox" {...register("acceptTerms")} />
            <p className="error">{errors.acceptTerms?.message}</p>
          </label>
        </div>
        <div>
          <label className="form-label">Colors:</label>
          {Object.values(ColorsEnum).map((color) => (
            <label key={color}>
              <input type="checkbox" value={color} {...register("colors")} />
              {color}
            </label>
          ))}
          {/* <label key="white">
            <input type="checkbox" value="white" {...register("colors")} />
            white
          </label>
          */}
          <p className="error">
            {errors.colors && (errors.colors as any).message}
          </p>
        </div>
        <div>
          <label className="form-label">Favorites:</label>
          <label>
            Coffee:
            <input type="radio" value="coffee" {...register("favorite")} />
          </label>
          <label>
            Tea:
            <input type="radio" value="tea" {...register("favorite")} />
          </label>
        </div>
        <div>
          <hr />
          <input type="submit" />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};
