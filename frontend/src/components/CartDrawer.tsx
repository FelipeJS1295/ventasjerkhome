import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  Stack,
  Badge,
  Paper
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  Delete,
  ShoppingCart,
  CreditCard,
  Weekend
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

    const handleCheckout = () => {
    navigate('/carrito');  // En lugar de '/checkout'
    closeCart();
    };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <Drawer
        anchor="right"
        open={state.isOpen}
        onClose={closeCart}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            backgroundColor: '#1E1E1E',
            color: 'white',
          }
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
              Carrito de Compras
            </Typography>
            <IconButton onClick={closeCart} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Carrito vacío */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <ShoppingCart sx={{ fontSize: 80, color: '#666', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: '#ccc' }}>
              Tu carrito está vacío
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 3, maxWidth: 250 }}>
              Agrega productos para comenzar tu compra
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                closeCart();
                navigate('/productos');
              }}
              sx={{
                backgroundColor: '#FF6B6B',
                '&:hover': { backgroundColor: '#ee5a52' }
              }}
            >
              Ver Productos
            </Button>
          </Box>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={state.isOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          backgroundColor: '#1E1E1E',
          color: 'white',
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 107, 107, 0.3)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                Carrito
              </Typography>
              <Badge 
                badgeContent={state.totalItems} 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#FF6B6B',
                    color: 'white'
                  }
                }}
              >
                <ShoppingCart sx={{ color: '#FF6B6B' }} />
              </Badge>
            </Box>
            <IconButton onClick={closeCart} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
          
          {/* Botón limpiar carrito */}
          <Button
            variant="text"
            size="small"
            onClick={clearCart}
            startIcon={<Delete />}
            sx={{
              color: '#999',
              mt: 1,
              fontSize: '0.8rem',
              '&:hover': { color: '#FF6B6B' }
            }}
          >
            Limpiar carrito
          </Button>
        </Box>

        {/* Lista de productos */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {state.items.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ p: 3, flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {/* Imagen del producto */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: '#333',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {item.product.imagenes && item.product.imagenes.length > 0 ? (
                        <img
                          src={`${process.env.REACT_APP_IMAGES_URL}/${item.product.imagenes[0]}`}
                          alt={item.product.nombre}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 8
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <Weekend sx={{ fontSize: 30, color: '#666' }} />
                      )}
                    </Box>

                    {/* Información del producto */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.product.nombre}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
                        SKU: {item.product.sku}
                      </Typography>

                      {/* Precio */}
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#FF6B6B',
                          fontWeight: 'bold'
                        }}
                      >
                        {formatPrice(item.product.precio_descuento || item.product.precio_venta)}
                      </Typography>
                    </Box>

                    {/* Botón eliminar */}
                    <IconButton
                      onClick={() => removeItem(item.product.id)}
                      sx={{
                        color: '#999',
                        alignSelf: 'flex-start',
                        '&:hover': { color: '#FF6B6B' }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  {/* Controles de cantidad */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        sx={{
                          color: 'white',
                          backgroundColor: 'rgba(255, 107, 107, 0.2)',
                          width: 32,
                          height: 32,
                          '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.3)' }
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      
                      <Paper
                        sx={{
                          px: 2,
                          py: 0.5,
                          backgroundColor: '#333',
                          color: 'white',
                          minWidth: 50,
                          textAlign: 'center'
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.quantity}
                        </Typography>
                      </Paper>
                      
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        sx={{
                          color: 'white',
                          backgroundColor: 'rgba(255, 107, 107, 0.2)',
                          width: 32,
                          height: 32,
                          '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.3)' }
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Subtotal */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {formatPrice((item.product.precio_descuento || item.product.precio_venta) * item.quantity)}
                    </Typography>
                  </Box>
                </ListItem>
                
                {index < state.items.length - 1 && (
                  <Divider sx={{ backgroundColor: 'rgba(255, 107, 107, 0.2)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Footer con total y checkout */}
        <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 107, 107, 0.3)' }}>
          {/* Resumen */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">
                Productos ({state.totalItems})
              </Typography>
              <Typography variant="body1">
                {formatPrice(state.totalAmount)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Envío
              </Typography>
              <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                Gratis
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 107, 107, 0.3)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                {formatPrice(state.totalAmount)}
              </Typography>
            </Box>
          </Box>

          {/* Botones */}
          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CreditCard />}
              onClick={handleCheckout}
              sx={{
                backgroundColor: '#FF6B6B',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#ee5a52',
                }
              }}
            >
              Finalizar Compra
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => {
                closeCart();
                navigate('/productos');
              }}
              sx={{
                borderColor: '#666',
                color: 'white',
                '&:hover': {
                  borderColor: '#FF6B6B',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)'
                }
              }}
            >
              Seguir Comprando
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;