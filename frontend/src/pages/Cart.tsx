import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  IconButton,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingBag as BagIcon,
  Chair as ChairIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calcular valores para el resumen
  const subtotal = state.items.reduce((sum, item) => sum + (item.product.precio_venta * item.quantity), 0);
  const totalWithDiscounts = state.items.reduce((sum, item) => {
    const price = item.product.precio_descuento && item.product.precio_descuento < item.product.precio_venta 
      ? item.product.precio_descuento 
      : item.product.precio_venta;
    return sum + (price * item.quantity);
  }, 0);
  const totalDiscount = subtotal - totalWithDiscounts;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleContinueShopping = () => {
    navigate('/productos');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <CartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="text.secondary">
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Agrega algunos productos para empezar tu compra
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            startIcon={<BagIcon />}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: '#FF6B6B',
              '&:hover': {
                backgroundColor: '#FF5252',
              },
            }}
          >
            Explorar Productos
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleContinueShopping}
          sx={{ mb: 2, color: '#FF6B6B' }}
        >
          Seguir Comprando
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Carrito
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {state.totalItems} {state.totalItems === 1 ? 'producto' : 'productos'} en tu carrito
        </Typography>
      </Box>

      {/* Layout principal con flexbox */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4 
      }}>
        {/* Lista de productos */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ backgroundColor: 'background.paper', borderRadius: 2 }}>
            {state.items.map((item, index) => (
              <Box key={item.product.id}>
                <Card
                  elevation={0}
                  sx={{
                    display: 'flex',
                    p: 2,
                    backgroundColor: 'transparent',
                  }}
                >
                <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 1,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    border: '2px solid rgba(255, 107, 107, 0.2)',
                }}
                >
                {item.product.imagenes && item.product.imagenes.length > 0 ? (
                    <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 1,
                    }}
                    image={`${process.env.REACT_APP_IMAGES_URL}${item.product.imagenes[0]}`}
                    alt={item.product.nombre}
                    />
                ) : (
                    <ChairIcon 
                    sx={{ 
                        fontSize: 60, 
                        color: '#FF6B6B' 
                    }} 
                    />
                )}
                </Box>
                  
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                        {item.product.nombre}
                      </Typography>
                      <IconButton
                        onClick={() => removeItem(item.product.id)}
                        size="small"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      SKU: {item.product.sku}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2
                    }}>
                      {/* Controles de cantidad */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          sx={{ 
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.2)' }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            handleQuantityChange(item.product.id, value);
                          }}
                          inputProps={{
                            min: 1,
                            style: { textAlign: 'center', width: '60px' }
                          }}
                          sx={{ width: '80px' }}
                        />
                        
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          sx={{ 
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.2)' }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Precios */}
                      <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        {item.product.precio_descuento && item.product.precio_descuento < item.product.precio_venta ? (
                          <>
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              {formatPrice(item.product.precio_venta * item.quantity)}
                            </Typography>
                            <Typography variant="h6" color="#FF6B6B" fontWeight="bold">
                              {formatPrice(item.product.precio_descuento * item.quantity)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="h6" fontWeight="bold">
                            {formatPrice(item.product.precio_venta * item.quantity)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                {index < state.items.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Resumen del pedido */}
        <Box sx={{ 
          width: { xs: '100%', md: '350px' },
          flexShrink: 0
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              position: { md: 'sticky' },
              top: 100,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Box>
              
              {totalDiscount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Descuentos:</Typography>
                  <Typography variant="body2" color="success.main">
                    -{formatPrice(totalDiscount)}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Envío:</Typography>
                <Typography variant="body2" color="success.main">
                  Gratis
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="#FF6B6B" fontWeight="bold">
                {formatPrice(state.totalAmount)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                backgroundColor: '#FF6B6B',
                '&:hover': {
                  backgroundColor: '#FF5252',
                },
                mb: 2,
              }}
            >
              Proceder al Checkout
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={clearCart}
              sx={{ color: 'error.main' }}
            >
              Vaciar Carrito
            </Button>

            <Alert severity="info" sx={{ mt: 2 }}>
              Envío gratis a todo Chile en compras sobre $100.000
            </Alert>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;