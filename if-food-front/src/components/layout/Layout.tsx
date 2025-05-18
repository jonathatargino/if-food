import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Navigation />
            <Box
                component="main"
                sx={{
                    p: 3,
                    width: "100%",
                    ...(isMobile && {
                        pb: 8,
                    }),
                }}>
                <Outlet />
            </Box>
        </Box>
    );
}
