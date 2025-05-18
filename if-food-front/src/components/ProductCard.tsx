import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ProductCardProps {
    name: string;
    photo_url: string;
    seller_name: string;
    value: number;
    className?: string;
}

export function ProductCard({ name, photo_url, seller_name, value, className }: ProductCardProps) {
    const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value / 100);

    return (
        <Card
            className={className}
            sx={{
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s",
                marginBottom: "8px",
                "&:hover": {
                    boxShadow: 6,
                },
            }}>
            <CardMedia
                component="img"
                image={photo_url}
                alt={name}
                sx={{
                    aspectRatio: "1/1",
                }}
            />
            <CardContent sx={{ p: 2 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mb: 1,
                    }}>
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>
                    {seller_name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                    {formattedPrice}
                </Typography>
            </CardContent>
        </Card>
    );
}
