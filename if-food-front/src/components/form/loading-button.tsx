import { Button, ButtonProps, CircularProgress, Stack } from "@mui/material";
import { ReactNode } from "react";

interface LoadingButtonProps {
    children: ReactNode;
    isLoading: boolean;
    loadingText: string;
    type?: ButtonProps["type"];
}

export function LoadingButton({
    children,
    isLoading,
    loadingText,
    type = "submit",
}: LoadingButtonProps) {
    return (
        <Button
            type={type}
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
                    {loadingText} <CircularProgress size={18} sx={{ color: "#2f9e3f" }} />
                </Stack>
            ) : (
                <>{children}</>
            )}
        </Button>
    );
}
