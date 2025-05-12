import { useState, useMemo, useEffect } from 'react';
import { Box, Container, Stack, Typography, Divider, Fade, Skeleton } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { ProductCarousel } from '../components/ProductCarousel';
import { StoreCard } from '../components/StoreCard';
import { SearchInput } from '../components/SearchInput';
import { mockProducts, mockStores } from '../utils/mockData';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CakeIcon from '@mui/icons-material/Cake';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteStores, setFavoriteStores] = useState(
    new Set(mockStores.filter(store => store.is_favorite).map(store => store.id))
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.seller_name.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const sortedStores = useMemo(() => {
    return [...mockStores].sort((a, b) => {
      // Sort by favorite status first
      if (favoriteStores.has(a.id) && !favoriteStores.has(b.id)) return -1;
      if (!favoriteStores.has(a.id) && favoriteStores.has(b.id)) return 1;
      return 0;
    });
  }, [favoriteStores]);

  const newProducts = useMemo(() => {
    // Get the 10 most recent products based on created_at
    return [...filteredProducts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);
  }, [filteredProducts]);

  const salgadosProducts = filteredProducts.filter(product => product.category === 'Salgado');
  const docesProducts = filteredProducts.filter(product => product.category === 'Doce');

  const handleToggleFavorite = (storeId: string) => {
    setFavoriteStores(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storeId)) {
        newSet.delete(storeId);
      } else {
        newSet.add(storeId);
      }
      return newSet;
    });
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <Icon color="primary" />
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Skeleton width={400} height={56} />
        </Box>
        {[1, 2, 3].map((section) => (
          <Box key={section} sx={{ mb: 6 }}>
            <Skeleton width={200} height={40} sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4].map((card) => (
                <Skeleton key={card} variant="rectangular" width={280} height={300} />
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    );
  }

  return (
    <Fade in={!isLoading} timeout={500}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </Box>

        {salgadosProducts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionTitle icon={RestaurantIcon} title="Salgados Populares" />
            <ProductCarousel products={salgadosProducts} title="" />
          </Box>
        )}

        {docesProducts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionTitle icon={CakeIcon} title="Doces Populares" />
            <ProductCarousel products={docesProducts} title="" />
          </Box>
        )}

        {newProducts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionTitle icon={NewReleasesIcon} title="Novidades" />
            <ProductCarousel products={newProducts} title="" />
          </Box>
        )}

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Lojas
          </Typography>
          <Stack spacing={2}>
            {sortedStores.map(store => (
              <StoreCard
                key={store.id}
                name={store.name}
                photo_url={store.photo_url}
                categories={store.categories}
                rating={store.rating}
                is_favorite={favoriteStores.has(store.id)}
                onToggleFavorite={() => handleToggleFavorite(store.id)}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Fade>
  );
} 