import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addItem } = useCart();
  const buttonRef = useRef<HTMLDivElement>(null);

  const imageUrl = product.imagenes && product.imagenes.length > 0
    ? `${process.env.REACT_APP_IMAGES_URL}${product.imagenes[0]}`
    : 'https://via.placeholder.com/400x300/1E1E1E/FF6B6B?text=Sin+Imagen';

  const precio = product.precio_descuento || product.precio_venta;
  const tieneDescuento = !!product.precio_descuento;

  const createFlyingIcon = () => {
    if (!buttonRef.current) return;

    // Crear el icono que va a volar
    const flyingIcon = document.createElement('div');
    flyingIcon.innerHTML = `
      <svg style="width: 32px; height: 32px; color: #FF6B6B;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20,9V7A2,2 0 0,0 18,5H14L12,3H8A2,2 0 0,0 6,5V9A2,2 0 0,0 8,11H18A2,2 0 0,0 20,9M8,7H18V9H8V7Z" />
      </svg>
    `;
    flyingIcon.style.position = 'fixed';
    flyingIcon.style.zIndex = '9999';
    flyingIcon.style.pointerEvents = 'none';
    flyingIcon.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    // Obtener posición del botón
    const buttonRect = buttonRef.current.getBoundingClientRect();
    flyingIcon.style.left = `${buttonRect.left + buttonRect.width / 2 - 16}px`;
    flyingIcon.style.top = `${buttonRect.top + buttonRect.height / 2 - 16}px`;

    // Agregar al DOM
    document.body.appendChild(flyingIcon);

    // Encontrar el carrito en el header
    const cartIcon = document.querySelector('[data-testid="ShoppingCartIcon"]')?.closest('button');
    
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Animar hacia el carrito
      setTimeout(() => {
        flyingIcon.style.left = `${cartRect.left + cartRect.width / 2 - 16}px`;
        flyingIcon.style.top = `${cartRect.top + cartRect.height / 2 - 16}px`;
        flyingIcon.style.transform = 'scale(0.5)';
        flyingIcon.style.opacity = '0';
      }, 100);

      // Eliminar el elemento después de la animación
      setTimeout(() => {
        if (document.body.contains(flyingIcon)) {
          document.body.removeChild(flyingIcon);
        }
        
        // Efecto bounce en el carrito
        if (cartIcon) {
          cartIcon.style.transform = 'scale(1.2)';
          setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
          }, 200);
        }
      }, 900);
    } else {
      // Si no encuentra el carrito, eliminar después de un tiempo
      setTimeout(() => {
        if (document.body.contains(flyingIcon)) {
          document.body.removeChild(flyingIcon);
        }
      }, 1000);
    }
  };

  const handleAddToCart = () => {
    // Crear la animación
    createFlyingIcon();
    
    // Agregar al carrito después de un pequeño delay
    setTimeout(() => {
      addItem(product);
    }, 200);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 380,
        m: 1,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px 0 rgba(255, 107, 107, 0.3)',
        }
      }}
    >
    <Box
      sx={{
        height: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E',
        color: '#FF6B6B'
      }}
      onClick={() => onViewDetails(product.id)}
    >
      {product.imagenes && product.imagenes.length > 0 ? (
        <CardMedia
          component="img"
          image={`${process.env.REACT_APP_IMAGES_URL}${product.imagenes[0]}`}
          alt={product.nombre}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      ) : (
        <WeekendIcon sx={{ fontSize: 100 }} />
      )}
    </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            mb: 1,
            fontWeight: 500,
            color: 'text.primary',
            minHeight: '3rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.nombre}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            mb: 2,
            minHeight: '2.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.descripcion_producto || 'Mueble de alta calidad y diseño exclusivo'}
        </Typography>

        <Box sx={{ mb: 3 }}>
          {tieneDescuento && (
            <Typography
              variant="body2"
              sx={{ 
                textDecoration: 'line-through', 
                color: 'text.secondary',
                fontSize: '0.9rem'
              }}
            >
              ${product.precio_venta ? product.precio_venta.toLocaleString() : '0'}
            </Typography>
          )}
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: '0.5px'
            }}
          >
            ${precio ? precio.toLocaleString() : '0'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Box 
            onClick={() => onViewDetails(product.id)}
            sx={{ 
              flex: 1,
              textAlign: 'center',
              py: 1.5,
              cursor: 'pointer',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '4px',
              color: 'primary.main',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(255, 107, 107, 0.05)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Ver más
          </Box>
          
          <Box 
            ref={buttonRef}
            onClick={handleAddToCart}
            sx={{ 
              flex: 1,
              textAlign: 'center',
              py: 1.5,
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.2)',
              borderRadius: '4px',
              color: 'primary.main',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: 'primary.main',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Agregar
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};