import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    gender: yup.string().required("gender is required."),
  })
  .required();

export const FormDropdown = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2>Form - Dropdown with validation</h2>
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
          <input type="submit" />
        </div>
      </form>
      <pre>{JSON.stringify(getValues())}</pre>
    </div>
  );
};

//https://react-hook-form.com/get-started#Registerfields
