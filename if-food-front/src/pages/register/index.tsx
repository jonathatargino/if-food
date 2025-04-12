import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Snackbar,
    Paper,
    Grid,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { RegisterFormData, schema } from "./schema";
import { userApi } from "../../services/if-food-api/user";
import { UserRole } from "../../models/user";

export const RegisterPage = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
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
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    marginTop: 8,
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                }}>
                <Box
                    sx={{
                        backgroundColor: "#2f9e3f",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                    }}>
                    <PersonOutline sx={{ color: "white", fontSize: 30 }} />
                </Box>

                <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Criar Conta
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, textAlign: "center" }}>
                    Preencha os dados abaixo para criar sua conta
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1, width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Nome"
                                autoComplete="name"
                                autoFocus
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Telefone"
                                autoComplete="phone"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                autoComplete="email"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth error={!!errors.study_course}>
                                <InputLabel id="study-course-label">Curso</InputLabel>
                                <Select
                                    labelId="study-course-label"
                                    id="study_course"
                                    label="Curso"
                                    {...register("study_course")}>
                                    <MenuItem value="Ciência da Computação">
                                        Ciência da Computação
                                    </MenuItem>
                                    <MenuItem value="Química">Química</MenuItem>
                                    <MenuItem value="Engenharia Ambiental">
                                        Engenharia Ambiental
                                    </MenuItem>
                                </Select>
                                {errors.study_course && (
                                    <Typography variant="caption" color="error">
                                        {errors.study_course.message}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Confirmar Senha"
                                type="password"
                                id="password_confirmation"
                                autoComplete="new-password"
                                {...register("password_confirmation")}
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControlLabel
                                control={<Switch {...register("is_seller")} color="success" />}
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
                </Box>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Conta criada com sucesso! Redirecionando para o login...
                </Alert>
            </Snackbar>

            <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};
