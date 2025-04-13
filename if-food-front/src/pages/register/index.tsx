import { Box, Container, Typography, Paper } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { RegisterForm } from "./components/form";

export const RegisterPage = () => {
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
                <RegisterForm />
            </Paper>
        </Container>
    );
};
