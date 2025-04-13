import { SxProps, TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface ControlledTextfieldProps {
    name: string;
    label: string;
    sx?: SxProps;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    isDisabled?: boolean;
    placeholder?: string;
}

export function ControlledTextField({
    name,
    label,
    type = "text",
    sx = {},
    isDisabled,
    placeholder,
}: ControlledTextfieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <TextField
            fullWidth
            label={label}
            autoComplete={name}
            placeholder={placeholder}
            type={type}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            disabled={isDisabled}
            sx={sx}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(name)}
        />
    );
}
