import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { productService } from '../services/productService';
import { Product, TipoProductoEnum } from '../types/Product';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevancia');
  const [priceRange, setPriceRange] = useState('');

  const navigate = useNavigate();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts({ limit: 100 });
      
    setProducts(data.productos || []);

    } catch (err) {
      setError('Error al cargar productos. Verifique la conexión.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // Función para filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descripcion_producto?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.tipo_producto === selectedCategory
      );
    }

    // Filtro por rango de precios
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const precio = product.precio_descuento || product.precio_venta;
        return precio >= min && precio <= max;
      });
    }

    // Ordenamiento
    switch (sortBy) {
      case 'precio_asc':
        filtered.sort((a, b) => {
          const precioA = a.precio_descuento || a.precio_venta || 0;
          const precioB = b.precio_descuento || b.precio_venta || 0;
          return precioA - precioB;
        });
        break;
      case 'precio_desc':
        filtered.sort((a, b) => {
          const precioA = a.precio_descuento || a.precio_venta || 0;
          const precioB = b.precio_descuento || b.precio_venta || 0;
          return precioB - precioA;
        });
        break;
      case 'nombre_asc':
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'visitas_desc':
        filtered.sort((a, b) => (b.visitas || 0) - (a.visitas || 0));
        break;
      default:
        // Relevancia - productos con descuento primero, luego por visitas
        filtered.sort((a, b) => {
          if (!!a.precio_descuento !== !!b.precio_descuento) {
            return !!b.precio_descuento ? 1 : -1;
          }
          return (b.visitas || 0) - (a.visitas || 0);
        });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const handleViewDetails = (id: number) => {
    navigate(`/productos/${id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress 
          size={60} 
          sx={{ color: 'primary.main' }}
        />
        <Typography 
          variant="h6" 
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          Cargando productos exclusivos...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: 'error.main',
            border: '1px solid rgba(244, 67, 54, 0.3)'
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header de la sección */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #FF6B6B, #FFB74D)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 300,
                letterSpacing: '3px'
              }}
            >
              COLECCIÓN EXCLUSIVA
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Descubre muebles de diseño premium que transforman espacios en experiencias únicas
            </Typography>
          </Box>

          {/* Filtros */}
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            totalProducts={filteredProducts.length}
          />

          {/* Productos usando flexbox */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'center' 
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Fade 
                  in={true} 
                  timeout={800 + index * 50}
                  key={product.id}
                >
                  <Box>
                    <ProductCard 
                      product={product} 
                      onViewDetails={handleViewDetails}
                    />
                  </Box>
                </Fade>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8, width: '100%' }}>
                <Typography 
                  variant="h5" 
                  sx={{ color: 'text.secondary', mb: 2 }}
                >
                  No se encontraron productos
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: 'text.secondary' }}
                >
                  Intenta ajustar los filtros para encontrar lo que buscas
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};