import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { UserRole } from "../../../../models/user";
import { userApi } from "../../../../services/if-food-api/user";
import { Box, Button, CircularProgress, Grid, Link, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";
import { ControlledSelect } from "../../../../components/form/controlled-select";
import { studyCourseOptions } from "./constants";
import { ControlledSwitch } from "../../../../components/form/controlled-switch";
import { useSnackbar } from "notistack";
import { useState } from "react";

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        try {
            const user = await userApi.create({
                name: data.name,
                phone: data.phone,
                email: data.email,
                studyCourse: data.study_course,
                password: data.password,
                role: data.is_seller ? UserRole.Seller : UserRole.Customer,
            });
            enqueueSnackbar({
                message: `Obrigado por se cadastrar, ${user.name}! Faça login para prosseguir`,
                variant: "success",
            });
            navigate("/login");
        } catch {
            enqueueSnackbar({
                message:
                    "Ocorreu um erro ao criar sua conta. Por favor, tente novamente. Se o problema persistir, contate o suporte",
                variant: "error",
            });
        }

        setIsLoading(false);
    };
    return (
        <FormProvider {...form}>
            <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit, console.error)}
                sx={{ mt: 1, width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField name="name" label="Nome" isDisabled={isLoading} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField
                            name="phone"
                            label="Telefone"
                            type="phone"
                            isDisabled={isLoading}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField name="email" label="Email" isDisabled={isLoading} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledSelect
                            label="Curso"
                            name="study_course"
                            options={studyCourseOptions}
                            isDisabled={isLoading}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField
                            name="password"
                            label="Senha"
                            type="password"
                            isDisabled={isLoading}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField
                            name="password_confirmation"
                            label="Confirmar senha"
                            type="password"
                            isDisabled={isLoading}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledSwitch
                            label="Sou vendedor"
                            name="is_seller"
                            isDisabled={isLoading}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
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
                    {isLoading ? (
                        <Stack gap={2} flexDirection="row" alignItems="center">
                            Criando conta <CircularProgress size={18} />
                        </Stack>
                    ) : (
                        <>Criar Conta</>
                    )}
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
        </FormProvider>
    );
}
