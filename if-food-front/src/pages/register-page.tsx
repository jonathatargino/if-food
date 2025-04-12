import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { PersonOutline, EmailOutlined, LockOutlined, SchoolOutlined } from "@mui/icons-material";

interface RegisterFormData {
    name: string;
    email: string;
    study_course: string;
    password: string;
    password_confirmation: string;
    is_seller: boolean;
    description?: string;
}

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    study_course: yup.string().required("Curso é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("Confirmação de senha é obrigatória"),
    is_seller: yup.boolean().required(),
    description: yup.string().optional(),
});

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
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
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
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome"
                        autoComplete="name"
                        autoFocus
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputProps={{
                            startAdornment: (
                                <PersonOutline sx={{ mr: 1, color: "action.active" }} />
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                            startAdornment: (
                                <EmailOutlined sx={{ mr: 1, color: "action.active" }} />
                            ),
                        }}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.study_course}>
                        <InputLabel id="study-course-label">Curso</InputLabel>
                        <Select
                            labelId="study-course-label"
                            id="study_course"
                            label="Curso"
                            {...register("study_course")}
                            startAdornment={
                                <SchoolOutlined sx={{ mr: 1, color: "action.active" }} />
                            }>
                            <MenuItem value="Ciência da Computação">Ciência da Computação</MenuItem>
                            <MenuItem value="Química">Química</MenuItem>
                            <MenuItem value="Engenharia Ambiental">Engenharia Ambiental</MenuItem>
                        </Select>
                        {errors.study_course && (
                            <Typography variant="caption" color="error">
                                {errors.study_course.message}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            startAdornment: <LockOutlined sx={{ mr: 1, color: "action.active" }} />,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirmar Senha"
                        type="password"
                        id="password_confirmation"
                        autoComplete="new-password"
                        {...register("password_confirmation")}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        InputProps={{
                            startAdornment: <LockOutlined sx={{ mr: 1, color: "action.active" }} />,
                        }}
                    />
                    <FormControlLabel
                        control={<Switch {...register("is_seller")} color="success" />}
                        label="Sou vendedor"
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        multiline
                        rows={4}
                        label="Descrição"
                        id="description"
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
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
