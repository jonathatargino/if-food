export enum ErrorCodesEnum {
    WrongPasswordOrEmail = 101,
    EmailAlreadyBeingUsed = 102,
    PhoneAlreadyBeingUser = 103,
}

export const errorCodeMessages: Record<ErrorCodesEnum, string> = {
    [ErrorCodesEnum.WrongPasswordOrEmail]: "Email ou senha incorretos",
    [ErrorCodesEnum.EmailAlreadyBeingUsed]: "Este email já está em uso",
    [ErrorCodesEnum.PhoneAlreadyBeingUser]: "Este número de telefone já está em uso",
};

export const defaultErrorMessage =
    "Ocorreu um erro inesperado. Por favor, tente novamente. Se o problema persistir, contate o suporte";
