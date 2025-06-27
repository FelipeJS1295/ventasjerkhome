import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import {
  Home,
  Build,
  Star,
  Handshake,
  Psychology,
  EmojiEvents,
  Group,
  TrendingUp,
  Verified
} from '@mui/icons-material';

const About: React.FC = () => {
  const timelineData = [
    {
      year: '2018',
      title: 'Los Inicios',
      description: 'Jerk Home comenzó en el patio de una casa, con esfuerzo y dedicación. Poco a poco, lo que era solo un sueño empezó a tomar forma.',
      icon: <Home />
    },
    {
      year: '2019',
      title: 'Primeros Pasos',
      description: 'Nos trasladamos a una pequeña bodega en Puente Alto, donde comenzamos a producir de forma minorista.',
      icon: <Build />
    },
    {
      year: '2020',
      title: 'Expansión',
      description: 'Gracias al trabajo constante, llegamos a Gabriela, en La Pintana, aumentando nuestra capacidad y producción.',
      icon: <TrendingUp />
    },
    {
      year: '2021 - Hoy',
      title: 'Consolidación',
      description: 'Operamos en Los Paltos 2769, fabricando para todo Chile y consolidándonos como una marca reconocida por su calidad y compromiso.',
      icon: <EmojiEvents />
    }
  ];

  const values = [
    {
      icon: <Star sx={{ fontSize: '3rem', color: '#FF6B6B' }} />,
      title: 'Calidad Premium',
      description: 'Utilizamos solo los mejores materiales y técnicas de fabricación para garantizar muebles duraderos y elegantes.'
    },
    {
      icon: <Handshake sx={{ fontSize: '3rem', color: '#4ECDC4' }} />,
      title: 'Compromiso',
      description: 'Nos comprometemos con cada cliente, desde el diseño hasta la entrega, asegurando una experiencia excepcional.'
    },
    {
      icon: <Psychology sx={{ fontSize: '3rem', color: '#45B7D1' }} />,
      title: 'Innovación',
      description: 'Constantemente buscamos nuevas formas de mejorar nuestros productos y procesos para superar expectativas.'
    },
    {
      icon: <Group sx={{ fontSize: '3rem', color: '#96CEB4' }} />,
      title: 'Trabajo en Equipo',
      description: 'Creemos en la colaboración y el respeto mutuo como base para crear productos excepcionales.'
    },
    {
      icon: <Verified sx={{ fontSize: '3rem', color: '#F7DC6F' }} />,
      title: 'Confianza',
      description: 'Construimos relaciones duraderas basadas en la transparencia, honestidad y cumplimiento de promesas.'
    },
    {
      icon: <Build sx={{ fontSize: '3rem', color: '#BB8FCE' }} />,
      title: 'Artesanía',
      description: 'Cada mueble es elaborado con dedicación artesanal, cuidando cada detalle para lograr la perfección.'
    }
  ];

  const stats = [
    { number: '6+', label: 'Años de experiencia' },
    { number: '1000+', label: 'Muebles fabricados' },
    { number: '500+', label: 'Familias satisfechas' },
    { number: '100%', label: 'Fabricación nacional' }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3,
              color: 'text.primary'
            }}
          >
            Nosotros
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: '#FF6B6B',
              fontWeight: 500,
              mb: 3
            }}
          >
            JERK HOME
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Desde 2018, transformando hogares con muebles de calidad premium. 
            Una historia de crecimiento, dedicación y compromiso con la excelencia.
          </Typography>
        </Box>

        {/* Misión y Visión */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mb: { xs: 6, md: 8 }
          }}
        >
          {/* Misión */}
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  color: '#FF6B6B'
                }}
              >
                Nuestra Misión
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'text.secondary',
                  lineHeight: 1.7
                }}
              >
                Crear muebles de calidad premium que transformen espacios en hogares únicos y acogedores, 
                brindando a cada familia productos duraderos que reflejen su personalidad y estilo de vida, 
                con el compromiso de la excelencia en cada detalle.
              </Typography>
            </Box>
          </Paper>

          {/* Visión */}
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 100,
                height: 100,
                background: 'radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  color: '#4ECDC4'
                }}
              >
                Nuestra Visión
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'text.secondary',
                  lineHeight: 1.7
                }}
              >
                Ser la marca líder en muebles premium en Chile, reconocida por nuestra innovación, 
                calidad artesanal y compromiso con la satisfacción del cliente, expandiendo nuestra 
                presencia a nivel nacional e inspirando hogares en todo el país.
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Estadísticas */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            mb: { xs: 6, md: 8 },
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 'bold',
              mb: 4,
              color: 'text.primary'
            }}
          >
            Nuestros Logros
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              textAlign: 'center'
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    mb: 1
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Timeline Personalizado */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 'bold',
              mb: 4,
              color: 'text.primary'
            }}
          >
            Nuestra Historia
          </Typography>
          
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {timelineData.map((item, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 4 },
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    position: 'relative',
                    '&::before': index < timelineData.length - 1 ? {
                      content: '""',
                      position: 'absolute',
                      left: { xs: 24, md: 40 },
                      bottom: -32,
                      width: '2px',
                      height: 32,
                      backgroundColor: '#FF6B6B',
                      zIndex: 1
                    } : {}
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    {/* Icono */}
                    <Box
                      sx={{
                        width: { xs: 48, md: 60 },
                        height: { xs: 48, md: 60 },
                        backgroundColor: '#FF6B6B',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {React.cloneElement(item.icon, { 
                        sx: { color: 'white', fontSize: { xs: '1.2rem', md: '1.5rem' } } 
                      })}
                    </Box>

                    {/* Contenido */}
                    <Box sx={{ flex: 1, pt: 0.5 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1.2rem', md: '1.4rem' },
                          fontWeight: 'bold',
                          color: '#FF6B6B',
                          mb: 1
                        }}
                      >
                        {item.year}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', md: '1rem' }
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Valores */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 'bold',
              mb: 4,
              color: 'text.primary'
            }}
          >
            Nuestros Valores
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3
            }}
          >
            {values.map((value, index) => (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {value.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {value.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
          <Divider sx={{ mb: 4 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary'
            }}
          >
            ¿Quieres ser parte de nuestra historia?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 3,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Descubre nuestro catálogo de muebles premium y únete a las familias que ya confían en JERK HOME.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;