import React, { FC } from "react";
import { TextField } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

interface IReactHookFormTextFieldProps {
  label: string;
  name: string;
}

const FormTextField: FC<IReactHookFormTextFieldProps> = ({
  label,
  name,
}: IReactHookFormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ?? ""}
      fullWidth
      margin="dense"
      defaultValue=""
      {...register(name)}
    />
  );
};

export default FormTextField;
