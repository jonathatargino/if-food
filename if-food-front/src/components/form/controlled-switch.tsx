import { FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ControlledSwitchProps {
    name: string;
    label: string;
    defaultValue?: boolean;
    isDisabled?: boolean;
}

export function ControlledSwitch({
    label,
    name,
    defaultValue = false,
    isDisabled,
}: ControlledSwitchProps) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormControlLabel
                    control={<Switch {...field} disabled={isDisabled} color="success" />}
                    label={label}
                />
            )}
        />
    );
}
