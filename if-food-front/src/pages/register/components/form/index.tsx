import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { UserRole } from "../../../../models/user";
import { userApi } from "../../../../services/if-food-api/user";
import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Snackbar,
    Switch,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";

export function RegisterForm() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const form = useForm<RegisterFormData>({
        resolver: yupResolver(schema) as any,
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
                        <FormControl fullWidth error={!!form.formState.errors.study_course}>
                            <InputLabel id="study-course-label">Curso</InputLabel>
                            <Select
                                labelId="study-course-label"
                                id="study_course"
                                label="Curso"
                                {...form.register("study_course")}>
                                <MenuItem value="Ciência da Computação">
                                    Ciência da Computação
                                </MenuItem>
                                <MenuItem value="Química">Química</MenuItem>
                                <MenuItem value="Engenharia Ambiental">
                                    Engenharia Ambiental
                                </MenuItem>
                            </Select>
                            {form.formState.errors.study_course && (
                                <Typography variant="caption" color="error">
                                    {form.formState.errors.study_course.message}
                                </Typography>
                            )}
                        </FormControl>
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
                        <FormControlLabel
                            control={<Switch {...form.register("is_seller")} color="success" />}
                            label="Sou vendedor"
                            sx={{ mt: 2, mb: 2 }}
                        />
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
