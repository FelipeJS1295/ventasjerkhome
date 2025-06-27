import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #1E1E1E 0%, #121212 100%)',
        borderTop: '1px solid rgba(255, 107, 107, 0.2)',
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ py: 6 }}>
          {/* Información principal */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 300,
                letterSpacing: '2px',
                mb: 2
              }}
            >
              JERK HOME
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: '600px', mx: 'auto' }}>
              Muebles de alta calidad y diseño exclusivo para espacios únicos. 
              Transformamos hogares en experiencias de lujo y confort.
            </Typography>
            
            {/* Redes sociales */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
              <IconButton 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', transform: 'scale(1.2)' }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', transform: 'scale(1.2)' }
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', transform: 'scale(1.2)' }
                }}
              >
                <WhatsApp />
              </IconButton>
            </Box>

            {/* Información de contacto */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +56 9 1234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  contacto@jerkhome.cl
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Santiago, Chile
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 107, 107, 0.2)' }} />

          <Box sx={{ textAlign: 'center', pt: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © 2024 Jerk Home. Todos los derechos reservados. | Diseño de interiores premium
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};