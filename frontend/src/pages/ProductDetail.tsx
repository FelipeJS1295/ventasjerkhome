import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  Alert,
  CircularProgress,
  Badge,
  Tooltip
} from '@mui/material';
import {
  ArrowBack,
  FavoriteBorder,
  Share,
  ShoppingCart,
  Visibility,
  LocalShipping,
  Security,
  CheckCircle,
  Weekend
} from '@mui/icons-material';
import { Product } from '../types/Product';
import { productService } from '../services/productService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await productService.getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const handleAddToCart = () => {
    console.log('Agregar al carrito:', product);
    // TODO: Implementar lógica del carrito
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.nombre,
        text: `Mira este producto: ${product?.nombre}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error || 'Producto no encontrado'}</Alert>
        <Button 
          onClick={() => navigate('/productos')} 
          sx={{ mt: 2 }}
          startIcon={<ArrowBack />}
        >
          Volver a productos
        </Button>
      </Box>
    );
  }

  const hasDiscount = product.precio_descuento && product.precio_descuento < product.precio_venta;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(product.precio_venta, product.precio_descuento!) 
    : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: '1200px', mx: 'auto' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          href="/productos" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/productos');
          }}
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Productos
        </Link>
        <Link 
          color="inherit" 
          href={`/productos?tipo=${product.tipo_producto}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/productos?tipo=${product.tipo_producto}`);
          }}
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {product.tipo_producto}
        </Link>
        <Typography color="text.primary">{product.nombre}</Typography>
      </Breadcrumbs>

      {/* Botón Volver */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/productos')}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        Volver a productos
      </Button>

      {/* Contenido Principal */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4 
      }}>
        {/* Galería de Imágenes */}
        <Box sx={{ flex: 1 }}>
          {/* Imagen Principal */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '300px', md: '500px' },
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 2,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {hasDiscount && (
              <Chip
                label={`-${discountPercentage}%`}
                color="error"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 1,
                  fontWeight: 'bold'
                }}
              />
            )}
            {product.imagenes && product.imagenes.length > 0 ? (
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${product.imagenes[selectedImage]}`}
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
              <Weekend 
                sx={{ 
                  fontSize: { xs: 120, md: 200 }, 
                  color: '#ccc' 
                }} 
              />
            )}
          </Box>

          {/* Miniaturas */}
          {product.imagenes && product.imagenes.length > 1 ? (
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
              {product.imagenes.map((imagen, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid' : '2px solid transparent',
                    borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_IMAGES_URL}/${imagen}`}
                    alt={`${product.nombre} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </Box>
              ))}
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Weekend sx={{ fontSize: 40, color: '#ccc' }} />
              </Box>
            </Stack>
          )}

          {/* Descripción debajo de las imágenes */}
          {product.descripcion_producto && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Descripción
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {product.descripcion_producto}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Información del Producto */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Encabezado */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flex: 1 }}>
              {product.nombre}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <FavoriteBorder />
              </IconButton>
              <IconButton size="small" onClick={handleShare}>
                <Share />
              </IconButton>
            </Stack>
          </Stack>

          {/* SKU y Visitas */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              SKU: {product.sku}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Visibility fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {product.visitas} visitas
              </Typography>
            </Stack>
          </Stack>

          {/* Precios */}
          <Box sx={{ mb: 3 }}>
            {hasDiscount ? (
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography 
                    variant="h4" 
                    color="error.main" 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {formatPrice(product.precio_descuento!)}
                  </Typography>
                  <Chip 
                    label={`Ahorra ${formatPrice(product.precio_venta - product.precio_descuento!)}`}
                    color="success"
                    size="small"
                  />
                </Stack>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  Precio normal: {formatPrice(product.precio_venta)}
                </Typography>
              </Stack>
            ) : (
              <Typography 
                variant="h4" 
                color="primary.main" 
                sx={{ fontWeight: 'bold' }}
              >
                {formatPrice(product.precio_venta)}
              </Typography>
            )}
          </Box>

          {/* Descripción */}
          {product.descripcion_producto && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Descripción
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {product.descripcion_producto}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Especificaciones */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Especificaciones
            </Typography>
            <Stack spacing={2}>
              {product.dimensiones && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Dimensiones:</strong>
                  </Typography>
                  <Typography variant="body2">{product.dimensiones}</Typography>
                </Box>
              )}
              {product.material && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Material:</strong>
                  </Typography>
                  <Typography variant="body2">{product.material}</Typography>
                </Box>
              )}
              {product.tiempo_entrega && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Tiempo de entrega:</strong>
                  </Typography>
                  <Typography variant="body2">{product.tiempo_entrega}</Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Beneficios */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocalShipping color="primary" />
              <Typography variant="body2">Envío gratis a todo Chile</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Security color="primary" />
              <Typography variant="body2">Garantía de 2 años</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircle color="primary" />
              <Typography variant="body2">Instalación incluida</Typography>
            </Stack>
          </Stack>

          {/* Botones de Acción */}
          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Agregar al Carrito
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Comprar Ahora
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;