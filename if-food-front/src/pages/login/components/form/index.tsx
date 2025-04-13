import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, schema } from "./schema";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";
import { useSnackbar } from "notistack";

export function LoginForm() {
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const form = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const user = await login(data.email, data.password);
            enqueueSnackbar({
                message: `Seja bem-vindo de volta, ${user.name} :)`,
                variant: "success",
            });
            navigate("/");
        } catch {
            enqueueSnackbar({
                message: "Ocorreu um erro. Por favor, tente novamente.",
                variant: "error",
            });
        }
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
                <ControlledTextField name="email" label="Email" />
                <ControlledTextField name="password" label="Senha" type="password" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        bgcolor: "#2f9e3f",
                        "&:hover": {
                            bgcolor: "#2f9e3f",
                            opacity: 0.9,
                        },
                    }}>
                    Entrar
                </Button>
            </Box>
        </FormProvider>
    );
}
