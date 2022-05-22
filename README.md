# React Hook Form

### Basic overview

**register**

- **register** is one of the key concepts in React Hook Form. This will make its value available for both the form validation and submission.

```js
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
    </form>
  );
}
```

**Integrating with UI libraries**

- you should use the Controller component, which will take care of the registration process.

```js
import { useForm, Controller, SubmitHandler } from "react-hook-form";
return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="MyCheckbox"
      control={control}
      defaultValue={false}
      rules={{ required: true }}
      render={({ field }) => <Checkbox {...field} />}
    />
    <input type="submit" />
  </form>
);
```

**Support schema-based form validation**

```js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInputs {
  firstName: string
  age: number
}

const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  return ()
}
```

### Official Documents

- [React Hook Form](https://react-hook-form.com/get-started)
- [YUP](https://github.com/jquense/yup)

### Examples

- [Basic Form](QuickStartForm.md)
- [yup validation with Dropdown, a single checkbox, multiple checkboxes](FormValidations.md)
test
