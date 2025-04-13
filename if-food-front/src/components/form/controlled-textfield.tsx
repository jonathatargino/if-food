import { SxProps, TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface ControlledTextfieldProps {
    name: string;
    label: string;
    sx?: SxProps;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

export function ControlledTextField({
    name,
    label,
    type = "text",
    sx = {},
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
            type={type}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            sx={sx}
            {...register(name)}
        />
    );
}
