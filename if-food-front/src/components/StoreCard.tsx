import { Card, CardMedia, CardContent, Typography, Box, IconButton, Chip, Rating, Zoom } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useState } from 'react';

interface StoreCardProps {
  name: string;
  photo_url: string;
  categories: string[];
  rating: number;
  is_favorite: boolean;
  onToggleFavorite: () => void;
}

export function StoreCard({ 
  name, 
  photo_url, 
  categories, 
  rating, 
  is_favorite,
  onToggleFavorite 
}: StoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        height: '140px',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateX(8px)' : 'none',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: 140, 
          height: '100%', 
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'none',
        }}
        image={photo_url}
        alt={name}
      />
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <IconButton 
            onClick={onToggleFavorite}
            color="primary"
            sx={{ 
              p: 0,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              }
            }}
          >
            <Zoom in={true} timeout={300}>
              {is_favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Zoom>
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                fontSize: '0.75rem',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
} 