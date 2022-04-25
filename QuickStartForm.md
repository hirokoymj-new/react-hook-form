# React Hook Form

## Quick Start

- [useForm](https://react-hook-form.com/api/useform)

```js
interface IFormInputs {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
  colors: ColorEnum[];
}

const {
  register,
  watch,
  formState: { errors },
  handleSubmit,
  getValues,
} = useForm<IFormInputs>();
```

**Input**

```js
<input {...register("firstName", { required: true, maxLength: 20 })} />;
{
  errors.firstName && "First name is required";
}
```

**Selectbox**

```js
<select {...register("gender")}>
  <option value="female">female</option>
  <option value="male">male</option>
  <option value="other">other</option>
</select>
```

**Checkbox**

```js
<label key="white">
  <input type="checkbox" value="white" {...register("colors")} />
  white
</label>
<label key="red">
  <input type="checkbox" value="red" {...register("colors")} />
  red
</label>
```

**onSubmit**

```js
const onSubmit: SubmitHandler<IFormInputs> = (data) => {
  console.log(data);
};
```
