import { AxiosError } from "axios";
import { EnqueueSnackbar } from "notistack";
import { defaultErrorMessage, errorCodeMessages, ErrorCodesEnum } from "./codes";

export function handleRequestError(error: unknown, enqueueSnackbar: EnqueueSnackbar) {
    if (error instanceof AxiosError) {
        const errorCode: ErrorCodesEnum | undefined = error.response?.data?.code;
        let errorMessage = defaultErrorMessage;

        if (errorCode) {
            errorMessage = errorCodeMessages[errorCode];
        }

        enqueueSnackbar({
            message: errorMessage,
            variant: "error",
        });
    } else {
        enqueueSnackbar({
            message: defaultErrorMessage,
            variant: "error",
        });
    }
}
