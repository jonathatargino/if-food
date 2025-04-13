import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, schema } from "./schema";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { LoadingButton } from "../../../../components/form/loading-button";
import { handleRequestError } from "../../../../utils/errors/handle-request-error";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const form = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        try {
            const user = await login(data.email, data.password);
            enqueueSnackbar({
                message: `Seja bem-vindo de volta, ${user.name} :)`,
                variant: "success",
            });
            navigate("/");
        } catch (error) {
            handleRequestError(error, enqueueSnackbar);
        }

        setIsLoading(false);
    };

    return (
        <FormProvider {...form}>
            <Box
                component={"form"}
                onSubmit={form.handleSubmit(onSubmit)}
                sx={{
                    mt: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                <ControlledTextField
                    name="email"
                    label="Email"
                    isDisabled={isLoading}
                    placeholder="laricamonstra@gmail.com"
                />
                <ControlledTextField
                    name="password"
                    label="Senha"
                    type="password"
                    isDisabled={isLoading}
                    placeholder="********"
                />
                <LoadingButton isLoading={isLoading} loadingText="Entrando">
                    Entrar
                </LoadingButton>
            </Box>
        </FormProvider>
    );
}
