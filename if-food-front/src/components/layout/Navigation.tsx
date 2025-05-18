import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    useTheme,
    useMediaQuery,
    Typography,
} from "@mui/material";
import {
    Store as StoreIcon,
    ShoppingCart as ProductsIcon,
    Receipt as OrdersIcon,
    Person as ProfileIcon,
    LocalPizza as PizzaIcon,
} from "@mui/icons-material";

const DRAWER_WIDTH = 240;

const navigationItems = [
    { label: "Produtos", icon: <ProductsIcon />, path: "/produtos" },
    { label: "Pedidos", icon: <OrdersIcon />, path: "/pedidos" },
    { label: "Minha Loja", icon: <StoreIcon />, path: "/minha-loja" },
    { label: "Perfil", icon: <ProfileIcon />, path: "/perfil" },
];

export function Navigation() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(() => {
        const currentPath = location.pathname;
        const index = navigationItems.findIndex((item) => item.path === currentPath);
        return index === -1 ? 0 : index;
    });

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const DesktopDrawer = () => (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                },
            }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mt: 2,
                    mb: 2,
                    cursor: "pointer",
                }}
                onClick={() => handleNavigation("/")}>
                <img
                    src={"pizza.svg"}
                    alt={"Logo do IF Food, uma fatia de pizza"}
                    style={{ height: "28px" }}
                />
                <Typography variant="h6" component="div" color="primary" fontWeight="bold">
                    IF FOOD
                </Typography>
            </Box>
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {navigationItems.map((item, index) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );

    const MobileNavigation = () => (
        <BottomNavigation
            value={value}
            onChange={(_, newValue) => {
                setValue(newValue);
                handleNavigation(navigationItems[newValue].path);
            }}
            sx={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                borderTop: "1px solid",
                borderColor: "divider",
                zIndex: theme.zIndex.appBar,
            }}>
            {navigationItems.map((item) => (
                <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
            ))}
        </BottomNavigation>
    );

    return isMobile ? <MobileNavigation /> : <DesktopDrawer />;
}
