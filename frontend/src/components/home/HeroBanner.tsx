import React from 'react';
import { Box, Typography, Button, Chip, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, LocalOffer } from '@mui/icons-material';

interface HeroBannerProps {
  config: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage?: string;
    backgroundColor: string;
    textColor: string;
    showPromotion: boolean;
    promotionText?: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ config }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(config.buttonLink);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '60vh', md: '80vh' },
        background: config.backgroundColor,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: config.textColor
      }}
    >
      {/* Imagen de fondo opcional */}
      {config.backgroundImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${config.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 1
          }}
        />
      )}

      {/* Overlay para mejorar legibilidad */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 2
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '60%' }
          }}
        >
          {/* Chip de promoción */}
          {config.showPromotion && config.promotionText && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip
                icon={<LocalOffer />}
                label={config.promotionText}
                sx={{
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  px: 2,
                  py: 1,
                  height: 'auto',
                  '& .MuiChip-label': {
                    px: 1
                  },
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                    },
                    '100%': {
                      transform: 'scale(1)',
                    },
                  }
                }}
              />
            </Box>
          )}

          {/* Título principal */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 'bold',
              mb: 2,
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {config.title}
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.8rem', lg: '2.2rem' },
              fontWeight: 300,
              mb: 3,
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {config.subtitle}
          </Typography>

          {/* Descripción */}
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 4,
              opacity: 0.8,
              maxWidth: '600px'
            }}
          >
            {config.description}
          </Typography>

          {/* Botón de acción */}
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleButtonClick}
              sx={{
                backgroundColor: '#FF6B6B',
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#ee5a52',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(255, 107, 107, 0.4)',
                }
              }}
            >
              {config.buttonText}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contacto')}
              sx={{
                borderColor: config.textColor,
                color: config.textColor,
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
                borderWidth: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#FF6B6B',
                  color: '#FF6B6B',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  borderWidth: 2,
                }
              }}
            >
              Contacto
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Elemento decorativo */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: { xs: '200px', md: '400px' },
          height: { xs: '200px', md: '400px' },
          background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default HeroBanner;