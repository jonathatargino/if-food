import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Snackbar,
    Paper,
    Link,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { LoginFormData, schema } from "./schema";

export const LoginPage = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
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
                    <LockOutlined sx={{ color: "white", fontSize: 30 }} />
                </Box>

                <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Bem-vindo ao IF Food
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, textAlign: "center" }}>
                    Faça login para acessar sua conta e começar a pedir
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
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

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Link
                            component={RouterLink}
                            to="/cadastro"
                            variant="body2"
                            sx={{ color: "#2f9e3f" }}>
                            Criar conta
                        </Link>
                    </Box>
                </Box>
            </Paper>

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
        </Container>
    );
};
