import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Weekend, 
  EventSeat, 
  Chair, 
  Bed,
  ArrowForward 
} from '@mui/icons-material';

interface Category {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

interface FeaturedCategoriesProps {
  config: {
    title: string;
    subtitle: string;
    categories: Category[];
  };
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ config }) => {
  const navigate = useNavigate();

  // Mapeo de iconos
  const iconMap: { [key: string]: React.ReactNode } = {
    Weekend: <Weekend />,
    EventSeat: <EventSeat />,
    Chair: <Chair />,
    Bed: <Bed />,
  };

  const handleCategoryClick = (link: string) => {
    navigate(link);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
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

      {/* Grid de categorías */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: { xs: 2, md: 3 },
          maxWidth: '1200px',
          mx: 'auto'
        }}
      >
        {config.categories.map((category, index) => (
          <Card
            key={category.name}
            onClick={() => handleCategoryClick(category.link)}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'background.paper',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                borderColor: category.color,
                '& .category-icon': {
                  transform: 'scale(1.1)',
                  color: category.color,
                },
                '& .category-arrow': {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
                '& .category-overlay': {
                  opacity: 1,
                }
              }
            }}
          >
            {/* Overlay decorativo */}
            <Box
              className="category-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, ${category.color}20 0%, transparent 70%)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}
            />

            <CardContent
              sx={{
                p: { xs: 2, md: 3 },
                height: { xs: '140px', md: '180px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Icono de la categoría */}
              <Box
                className="category-icon"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  color: 'text.secondary',
                  mb: { xs: 1, md: 2 },
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {iconMap[category.icon]}
              </Box>

              {/* Nombre de la categoría */}
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 'bold',
                  mb: 1,
                  color: 'text.primary'
                }}
              >
                {category.displayName}
              </Typography>

              {/* Descripción */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  color: 'text.secondary',
                  lineHeight: 1.4,
                  mb: 1
                }}
              >
                {category.description}
              </Typography>

              {/* Flecha de navegación */}
              <ArrowForward
                className="category-arrow"
                sx={{
                  fontSize: '1.2rem',
                  color: category.color,
                  opacity: 0,
                  transform: 'translateX(-10px)',
                  transition: 'all 0.3s ease',
                  mt: 'auto'
                }}
              />
            </CardContent>

            {/* Línea decorativa inferior */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${category.color} 0%, transparent 100%)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '.MuiCard-root:hover &': {
                  opacity: 1
                }
              }}
            />
          </Card>
        ))}
      </Box>

      {/* Estadísticas o información adicional */}
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          p: { xs: 2, md: 3 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          textAlign: 'center'
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B6B' }}>
              +500
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Productos disponibles
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h4" color="text.secondary">•</Typography>
          </Box>
          
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4ECDC4' }}>
              98%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Satisfacción del cliente
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h4" color="text.secondary">•</Typography>
          </Box>
          
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#45B7D1' }}>
              24/7
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Atención al cliente
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default FeaturedCategories;