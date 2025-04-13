import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { UserRole } from "../../../../models/user";
import { userApi } from "../../../../services/if-food-api/user";
import { useState } from "react";
import { Alert, Box, Button, Grid, Link, Snackbar } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";
import { ControlledSelect } from "../../../../components/form/controlled-select";
import { studyCourseOptions } from "./constants";
import { ControlledSwitch } from "../../../../components/form/controlled-switch";

export function RegisterForm() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const form = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const user = await userApi.create({
                name: data.name,
                phone: data.phone,
                email: data.email,
                studyCourse: data.study_course,
                password: data.password,
                role: data.is_seller ? UserRole.Seller : UserRole.Customer,
            });
            console.log(user);
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch {
            setErrorMessage(
                "Ocorreu um erro ao criar sua conta. Por favor, tente novamente. Se o problema persistir, contate o suporte",
            );
            setShowError(true);
        }
    };
    return (
        <FormProvider {...form}>
            <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit)}
                sx={{ mt: 1, width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField name="name" label="Nome" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField name="phone" label="Telefone" type="phone" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField name="email" label="Email" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledSelect
                            label="Curso"
                            name="study_course"
                            options={studyCourseOptions}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField name="password" label="Senha" type="password" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField
                            name="password_confirmation"
                            label="Confirmar senha"
                            type="password"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledSwitch label="Sou vendedor" name="is_seller" />
                    </Grid>
                </Grid>
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
                    Criar Conta
                </Button>

                <Grid container justifyContent="center">
                    <Grid>
                        <Link
                            component={RouterLink}
                            to="/login"
                            variant="body2"
                            sx={{ color: "#2f9e3f" }}>
                            Já tem uma conta? Faça login
                        </Link>
                    </Grid>
                </Grid>

                <Snackbar
                    open={showSuccess}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccess(false)}>
                    <Alert severity="success" sx={{ width: "100%" }}>
                        Conta criada com sucesso! Redirecionando para o login...
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={showError}
                    autoHideDuration={6000}
                    onClose={() => setShowError(false)}>
                    <Alert severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </FormProvider>
    );
}
