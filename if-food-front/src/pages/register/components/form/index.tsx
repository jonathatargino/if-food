import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { UserRole } from "../../../../models/user";
import { userApi } from "../../../../services/if-food-api/user";
import { Box, Grid, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ControlledTextField } from "../../../../components/form/controlled-textfield";
import { ControlledSelect } from "../../../../components/form/controlled-select";
import { studyCourseOptions } from "./constants";
import { ControlledSwitch } from "../../../../components/form/controlled-switch";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { LoadingButton } from "../../../../components/form/loading-button";
import { applyPhoneMask } from "../../../../utils/masks/phone";
import { MaskedTextfield } from "../../../../components/form/masked-textfield";
import { handleRequestError } from "../../../../utils/errors/handle-request-error";
import Confetti from "react-confetti";

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
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
            setShowConfetti(true);
            enqueueSnackbar({
                message: `Obrigado por se cadastrar, ${user.name}! Faça login para prosseguir`,
                variant: "success",
            });

            setIsLoading(false);
            await new Promise((resolve) => setTimeout(resolve, 5000));

            navigate("/login");
        } catch (error) {
            handleRequestError(error, enqueueSnackbar);
            setIsLoading(false);
        }
    };
    return (
        <FormProvider {...form}>
            <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit, console.error)}
                sx={{ mt: 1, width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField
                            name="name"
                            label="Nome*"
                            isDisabled={isLoading}
                            placeholder="Ricardo Corbucci"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledTextField
                            name="email"
                            label="Email*"
                            isDisabled={isLoading}
                            placeholder="laricamonstra@gmail.com"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField
                            name="password"
                            label="Senha*"
                            type="password"
                            isDisabled={isLoading}
                            placeholder="********"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <ControlledTextField
                            name="password_confirmation"
                            label="Confirmar senha*"
                            type="password"
                            isDisabled={isLoading}
                            placeholder="********"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <ControlledSelect
                            label="Curso*"
                            name="study_course"
                            options={studyCourseOptions}
                            isDisabled={isLoading}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <MaskedTextfield
                            name="phone"
                            label="Telefone*"
                            type="phone"
                            isDisabled={isLoading}
                            placeholder={"(85) 98002-8922"}
                            maskFn={applyPhoneMask}
                        />
                    </Grid>
                    <Grid
                        size={{ xs: 12, sm: 6 }}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <ControlledSwitch
                            label="Sou vendedor"
                            name="is_seller"
                            isDisabled={isLoading}
                        />
                    </Grid>
                </Grid>
                <LoadingButton isLoading={isLoading} loadingText="Criando conta">
                    Criar Conta
                </LoadingButton>

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
            {showConfetti && <Confetti gravity={0.3} />}
        </FormProvider>
    );
}
