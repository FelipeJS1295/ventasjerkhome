import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalOffer, ArrowForward, Whatshot } from '@mui/icons-material';

interface PromotionalSectionProps {
  config: {
    type: 'banner' | 'card' | 'video';
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor: string;
    textColor: string;
    image?: string;
  };
}

const PromotionalSection: React.FC<PromotionalSectionProps> = ({ config }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(config.buttonLink);
  };

  if (config.type === 'banner') {
    return (
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              background: config.backgroundColor,
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              minHeight: { xs: '250px', md: '300px' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Imagen de fondo opcional */}
            {config.image && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.2,
                  zIndex: 1
                }}
              />
            )}

            {/* Efectos decorativos */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1
              }}
            />
            
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1
              }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: { xs: 3, md: 4 },
                  py: { xs: 3, md: 4 },
                  px: { xs: 2, md: 4 }
                }}
              >
                {/* Contenido de texto */}
                <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                  {/* Icono de oferta */}
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      <Whatshot sx={{ color: config.textColor, fontSize: '1.2rem' }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: config.textColor,
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}
                      >
                        OFERTA ESPECIAL
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      fontWeight: 'bold',
                      color: config.textColor,
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {config.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.3rem' },
                      color: config.textColor,
                      opacity: 0.9,
                      mb: 2,
                      fontWeight: 500
                    }}
                  >
                    {config.subtitle}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: config.textColor,
                      opacity: 0.8,
                      mb: 3,
                      lineHeight: 1.6,
                      maxWidth: '500px',
                      mx: { xs: 'auto', md: 0 }
                    }}
                  >
                    {config.description}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={handleButtonClick}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#1a1a1a',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                      }
                    }}
                  >
                    {config.buttonText}
                  </Button>
                </Box>

                {/* Elemento visual decorativo */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 200,
                    position: 'relative'
                  }}
                >
                  <LocalOffer
                    sx={{
                      fontSize: '8rem',
                      color: 'rgba(255,255,255,0.1)',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' },
                        '100%': { transform: 'translateY(0px)' }
                      }
                    }}
                  />
                </Box>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    );
  }

  // Tipo card (alternativo)
  if (config.type === 'card') {
    return (
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Box
            sx={{
              background: config.backgroundColor,
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <LocalOffer
              sx={{
                fontSize: '3rem',
                color: config.textColor,
                mb: 2,
                opacity: 0.8
              }}
            />
            
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: config.textColor,
                fontWeight: 'bold',
                mb: 1
              }}
            >
              {config.title}
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: config.textColor,
                opacity: 0.9,
                mb: 2
              }}
            >
              {config.subtitle}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: config.textColor,
                opacity: 0.8,
                mb: 3,
                maxWidth: '400px',
                mx: 'auto'
              }}
            >
              {config.description}
            </Typography>
            
            <Button
              variant="outlined"
              size="large"
              onClick={handleButtonClick}
              sx={{
                borderColor: config.textColor,
                color: config.textColor,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: config.textColor
                }
              }}
            >
              {config.buttonText}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Fallback por si no se especifica tipo
  return null;
};

export default PromotionalSection;