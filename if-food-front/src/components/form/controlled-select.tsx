import { FormControl, InputLabel, MenuItem, Select, SxProps, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOption {
    value: string | number;
    label: string;
}

interface ControlledSelectProps {
    name: string;
    label: string;
    options: SelectOption[] | Readonly<SelectOption[]>;
    sx?: SxProps;
}

export function ControlledSelect({ label, name, options, sx = {} }: ControlledSelectProps) {
    const { control } = useFormContext();

    const labelId = `${name}-label`;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, formState }) => (
                <FormControl fullWidth error={!!formState.errors.study_course}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select fullWidth {...field} labelId={labelId} sx={sx} label={label}>
                        {options.map((option) => (
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                    {formState.errors[name] && (
                        <Typography variant="caption" color="error" marginLeft={2}>
                            {formState.errors[name]?.message as string}
                        </Typography>
                    )}
                </FormControl>
            )}
        />
    );
}
