import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromotionalSection from '../components/home/PromotionalSection';
import BenefitsSection from '../components/home/BenefitsSection';
import { homeConfig } from '../config/homeConfig';
import { Product } from '../types/Product';
import { productService } from '../services/productService';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Cargar productos con descuento o los más visitados
      const response = await productService.getProducts({ 
        limit: 8 
      });
      
      // Filtrar productos con descuento o más visitados
      const productsWithDiscount = response.productos.filter(
        (product: Product) => product.precio_descuento && product.precio_descuento < product.precio_venta
      );
      
      // Si no hay productos con descuento, usar los más visitados
      const finalProducts = productsWithDiscount.length > 0 
        ? productsWithDiscount.slice(0, 8)
        : response.productos
            .sort((a: Product, b: Product) => (b.visitas || 0) - (a.visitas || 0))
            .slice(0, 8);
      
      setFeaturedProducts(finalProducts);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Banner Principal */}
      {homeConfig.sections.heroBanner.enabled && (
        <HeroBanner config={homeConfig.sections.heroBanner} />
      )}

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Categorías Destacadas */}
        {homeConfig.sections.featuredCategories.enabled && (
          <FeaturedCategories config={homeConfig.sections.featuredCategories} />
        )}

        {/* Sección Promocional */}
        {homeConfig.sections.promotional.enabled && (
          <PromotionalSection config={homeConfig.sections.promotional} />
        )}

        {/* Productos Destacados */}
        {homeConfig.sections.featuredProducts.enabled && (
          <FeaturedProducts 
            config={homeConfig.sections.featuredProducts}
            products={featuredProducts}
            loading={loading}
          />
        )}

        {/* Beneficios */}
        {homeConfig.sections.benefits.enabled && (
          <BenefitsSection config={homeConfig.sections.benefits} />
        )}
      </Container>
    </Box>
  );
};

export default Home;