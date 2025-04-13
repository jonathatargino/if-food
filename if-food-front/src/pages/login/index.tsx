import { Box, Container, Typography, Paper, Link } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { LoginForm } from "./components/form";

export const LoginPage = () => {
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

                <LoginForm />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Link
                        component={RouterLink}
                        to="/cadastro"
                        variant="body2"
                        sx={{ color: "#2f9e3f" }}>
                        Criar conta
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};
