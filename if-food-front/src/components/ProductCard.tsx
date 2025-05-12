import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface ProductCardProps {
  name: string;
  photo_url: string;
  seller_name: string;
  value: number;
}

export function ProductCard({ name, photo_url, seller_name, value }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={photo_url}
        alt={name}
        sx={{ 
          height: 200,
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {seller_name}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          fontWeight="bold"
        >
          {formattedPrice}
        </Typography>
      </CardContent>
    </Card>
  );
} 