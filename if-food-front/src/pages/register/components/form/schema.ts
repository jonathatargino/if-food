import * as yup from "yup";

export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    study_course: string;
    password: string;
    password_confirmation: string;
    is_seller: boolean;
}

export const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    study_course: yup.string().required("Curso é obrigatório"),
    phone: yup
        .string()
        .required("Telefone é obrigatório")
        .test("phone should have 11 digits", "Telefone incompleto", (value) => {
            return value.replace(/\D/g, "").length === 11;
        }),
    password: yup
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("Confirmação de senha é obrigatória"),
    is_seller: yup.boolean().required(),
});
