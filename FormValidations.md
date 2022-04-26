# Form Validation with Yup

- [Yup - schema-based form validation](https://github.com/jquense/yup)

### Input and email fields validation

```js
const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup
      .string()
      .required("email is required")
      .email("Check an email format"),
  })
  .required();
```

### A dropdown, a checkbox and multiple checkboxes validation

```js
type FormExampleInputs = {
  gender: GenderEnum | "", //Dropdown
  colors: ColorsEnum[], // multiple checkboxes
  acceptTerms: boolean, //A single checkbox
};

const formExampleSchema = yup
  .object({
    acceptTerms: yup.boolean().oneOf([true], "Accept Ts & Cs is required"),
    colors: yup.array().min(1).of(yup.string().required("Color is required")),
    gender: yup.string().required("gender is required."),
  })
  .required();
```

**Entire code**

```js
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
```
