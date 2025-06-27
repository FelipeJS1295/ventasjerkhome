import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import {
  LocalShipping,
  Build,
  Security,
  Support,
  Payment,
  ThumbUp,
  CheckCircle,
  Star
} from '@mui/icons-material';

interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface BenefitsSectionProps {
  config: {
    title: string;
    items: Benefit[];
  };
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ config }) => {
  // Mapeo de iconos
  const iconMap: { [key: string]: React.ReactNode } = {
    LocalShipping: <LocalShipping />,
    Build: <Build />,
    Security: <Security />,
    Support: <Support />,
    Payment: <Payment />,
    ThumbUp: <ThumbUp />,
    CheckCircle: <CheckCircle />,
    Star: <Star />,
  };

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
            Descubre todas las ventajas de elegir JERK HOME para tu hogar
          </Typography>
        </Box>

        {/* Grid de beneficios */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: { xs: 3, md: 4 },
            mb: { xs: 4, md: 6 }
          }}
        >
          {config.items.map((benefit, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                  borderColor: benefit.color,
                  '& .benefit-icon': {
                    transform: 'scale(1.1)',
                    color: benefit.color,
                  },
                  '& .benefit-overlay': {
                    opacity: 1,
                  }
                }
              }}
            >
              {/* Overlay decorativo */}
              <Box
                className="benefit-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 1
                }}
              />

              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Icono del beneficio */}
                <Box
                  className="benefit-icon"
                  sx={{
                    fontSize: '3.5rem',
                    color: 'text.secondary',
                    mb: 2,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: `${benefit.color}10`,
                    border: `2px solid ${benefit.color}20`
                  }}
                >
                  {iconMap[benefit.icon]}
                </Box>

                {/* Título del beneficio */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                    fontWeight: 'bold',
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  {benefit.title}
                </Typography>

                {/* Descripción */}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    textAlign: 'center'
                  }}
                >
                  {benefit.description}
                </Typography>
              </CardContent>

              {/* Línea decorativa inferior */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0%',
                  height: '3px',
                  background: benefit.color,
                  transition: 'width 0.3s ease',
                  '.MuiCard-root:hover &': {
                    width: '80%'
                  }
                }}
              />
            </Card>
          ))}
        </Box>

        {/* Sección de compromiso */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Elementos decorativos */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: -20,
              width: 100,
              height: 100,
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              right: -30,
              width: 150,
              height: 150,
              background: 'radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 'bold',
                mb: 3,
                color: 'text.primary'
              }}
            >
              Nuestro Compromiso Contigo
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.3rem' },
                color: 'text.secondary',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.7
              }}
            >
              En JERK HOME no solo vendemos muebles, creamos experiencias. Cada producto 
              está respaldado por años de experiencia y un equipo comprometido con tu satisfacción.
            </Typography>

            {/* Estadísticas destacadas */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)'
                },
                gap: { xs: 3, md: 4 },
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    mb: 1
                  }}
                >
                  +10
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Años de experiencia
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#4ECDC4',
                    mb: 1
                  }}
                >
                  +5K
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Clientes satisfechos
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#45B7D1',
                    mb: 1
                  }}
                >
                  98%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Satisfacción garantizada
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#96CEB4',
                    mb: 1
                  }}
                >
                  24/7
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Soporte disponible
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsSection;