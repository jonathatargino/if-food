import { Box, Typography, Link, IconButton, useTheme, useMediaQuery, Fade } from '@mui/material';
import { ProductCard } from './ProductCard';
import { useRef, useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Product {
  id: string;
  name: string;
  photo_url: string;
  seller_name: string;
  value: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const SCROLL_AMOUNT = 300;
  const CARD_WIDTH = isMobile ? 280 : 300;

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ mb: 6, position: 'relative' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Link 
          href="#" 
          underline="hover" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 500,
            fontSize: '0.875rem'
          }}
        >
          Ver mais
        </Link>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Fade in={showLeftButton}>
          <IconButton
            onClick={() => handleScroll('left')}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Fade>

        <Fade in={showRightButton}>
          <IconButton
            onClick={() => handleScroll('right')}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Fade>

        <Box
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 2,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            // Add padding to the right to show cut-off effect
            '&::after': {
              content: '""',
              minWidth: '1rem',
            }
          }}
        >
          {products.map(product => (
            <Box
              key={product.id}
              sx={{
                minWidth: {
                  xs: '280px',
                  sm: '300px',
                },
                maxWidth: {
                  xs: '280px',
                  sm: '300px',
                },
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <ProductCard
                name={product.name}
                photo_url={product.photo_url}
                seller_name={product.seller_name}
                value={product.value}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 