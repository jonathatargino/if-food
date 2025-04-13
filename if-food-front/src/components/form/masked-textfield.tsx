import { Controller, useFormContext } from "react-hook-form";
import { ControlledTextfieldProps } from "./controlled-textfield";
import { TextField } from "@mui/material";

interface MaskedTextfieldProps extends ControlledTextfieldProps {
    maskFn?: (value: string) => string;
}

export function MaskedTextfield({
    label,
    name,
    isDisabled,
    maskFn,
    placeholder,
    sx,
    type,
}: MaskedTextfieldProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    fullWidth
                    {...field}
                    label={label}
                    autoComplete={name}
                    placeholder={placeholder}
                    type={type}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    disabled={isDisabled}
                    sx={sx}
                    slotProps={{ inputLabel: { shrink: true } }}
                    onChange={(e) => {
                        const newValue = e.target.value;

                        if (maskFn) {
                            return field.onChange(maskFn(newValue));
                        }

                        field.onChange(newValue);
                    }}
                />
            )}
        />
    );
}
