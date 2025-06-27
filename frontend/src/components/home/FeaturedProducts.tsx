import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Container 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Weekend } from '@mui/icons-material';
import { Product } from '../../types/Product';

interface FeaturedProductsProps {
  config: {
    title: string;
    subtitle: string;
    showDiscountBadge: boolean;
    maxProducts: number;
  };
  products: Product[];
  loading: boolean;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  config, 
  products, 
  loading 
}) => {
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate('/productos');
  };

  if (loading) {
    return (
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
              {config.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {config.subtitle}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '300px' 
          }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
              {config.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {config.subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 4,
              backgroundColor: 'background.paper',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Weekend 
              sx={{ 
                fontSize: '4rem', 
                color: 'text.secondary', 
                opacity: 0.5,
                mb: 2 
              }} 
            />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No hay productos destacados disponibles
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Pero puedes explorar todo nuestro catálogo de muebles premium
            </Typography>
            <Button
              variant="contained"
              onClick={handleViewAllProducts}
              startIcon={<ArrowForward />}
            >
              Ver Todo el Catálogo
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Limitar productos según configuración
  const displayProducts = products.slice(0, config.maxProducts);

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {/* Encabezado de la sección */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary'
            }}
          >
            {config.title}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {config.subtitle}
          </Typography>
        </Box>

        {/* Grid de productos */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 2, md: 3 },
            mb: { xs: 4, md: 6 }
          }}
        >
          {displayProducts.map((product, index) => (
            <Box
              key={product.id}
              sx={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease forwards`,
                animationDelay: `${index * 0.1}s`,
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              {/* Crear tarjeta de producto manualmente sin usar ProductCard */}
              <Box
                onClick={() => navigate(`/productos/${product.id}`)}
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }
                }}
              >
                {/* Imagen del producto */}
                <Box
                  sx={{
                    height: 200,
                    position: 'relative',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {product.imagenes && product.imagenes.length > 0 ? (
                    <img
                      src={`${process.env.REACT_APP_IMAGES_URL}/${product.imagenes[0]}`}
                      alt={product.nombre}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  ) : (
                    <Weekend sx={{ fontSize: 60, color: '#ccc' }} />
                  )}
                  
                  {/* Badge de descuento */}
                  {product.precio_descuento && product.precio_descuento < product.precio_venta && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      -{Math.round(((product.precio_venta - product.precio_descuento) / product.precio_venta) * 100)}%
                    </Box>
                  )}
                </Box>

                {/* Información del producto */}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.nombre}
                  </Typography>

                  {/* Precios */}
                  <Box sx={{ mb: 1 }}>
                    {product.precio_descuento && product.precio_descuento < product.precio_venta ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#FF6B6B',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                          }}
                        >
                          ${product.precio_descuento.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                            fontSize: '0.9rem'
                          }}
                        >
                          ${product.precio_venta.toLocaleString()}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}
                      >
                        ${product.precio_venta.toLocaleString()}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.8rem' }}
                  >
                    {product.visitas} visitas
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Botón para ver más productos */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            onClick={handleViewAllProducts}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              borderWidth: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(255, 107, 107, 0.2)',
              }
            }}
          >
            Ver Todos los Productos
          </Button>
        </Box>

        {/* Información adicional */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            p: { xs: 3, md: 4 },
            backgroundColor: 'background.paper',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary'
            }}
          >
            ¿Por qué elegir nuestros productos?
          </Typography>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: { xs: 2, md: 4 },
              mt: 3
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#FF6B6B',
                  mb: 1
                }}
              >
                Calidad Premium
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Materiales de primera calidad y acabados excepcionales
              </Typography>
            </Box>
            
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#4ECDC4',
                  mb: 1
                }}
              >
                Diseño Exclusivo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Piezas únicas que transforman cualquier espacio
              </Typography>
            </Box>
            
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#45B7D1',
                  mb: 1
                }}
              >
                Garantía Total
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 años de garantía y servicio post-venta especializado
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;