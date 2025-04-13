import { Alert, Box, Button, Snackbar } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, schema } from "./schema";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";

export function LoginForm() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password);
            setShowSuccess(true);
            navigate("/");
        } catch {
            setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
            setShowError(true);
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
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Bem-vindo de volta! Login realizado com sucesso.
                </Alert>
            </Snackbar>

            <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </FormProvider>
    );
}
