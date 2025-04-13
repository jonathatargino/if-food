import { FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ControlledSwitchProps {
    name: string;
    label: string;
}

export function ControlledSwitch({ label, name }: ControlledSwitchProps) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormControlLabel control={<Switch {...field} color="success" />} label={label} />
            )}
        />
    );
}
