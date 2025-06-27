import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  Divider
} from '@mui/material';
import {
  Email,
  LocationOn,
  Send,
  CheckCircle,
  BusinessCenter,
  Schedule
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: '2rem', color: '#FF6B6B' }} />,
      title: 'Correo Electrónico',
      description: 'Escríbenos y te responderemos a la brevedad',
      value: 'contacto@jerkhome.cl',
      action: () => window.open('mailto:contacto@jerkhome.cl')
    },
    {
      icon: <LocationOn sx={{ fontSize: '2rem', color: '#4ECDC4' }} />,
      title: 'Dirección',
      description: 'Visítanos en nuestro showroom',
      value: 'Los Paltos 2769, La Pintana',
      action: () => window.open('https://maps.google.com/?q=Los+Paltos+2769,+La+Pintana', '_blank')
    },
    {
      icon: <Schedule sx={{ fontSize: '2rem', color: '#45B7D1' }} />,
      title: 'Horarios de Atención',
      description: 'Lunes a Viernes',
      value: '9:00 - 18:00 hrs',
      action: null
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="lg">
        {/* Encabezado */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary'
            }}
          >
            Contáctanos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            ¿Tienes alguna pregunta sobre nuestros muebles? Estamos aquí para ayudarte. 
            Contáctanos y te responderemos lo antes posible.
          </Typography>
        </Box>

        {/* Contenido Principal */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start'
          }}
        >
          {/* Información de Contacto */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 'bold',
                mb: 3,
                color: 'text.primary'
              }}
            >
              Información de Contacto
            </Typography>

            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  onClick={info.action || undefined}
                  sx={{
                    p: 3,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    cursor: info.action ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    '&:hover': info.action ? {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      borderColor: '#FF6B6B'
                    } : {}
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flexShrink: 0 }}>
                      {info.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          mb: 0.5,
                          color: 'text.primary'
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 1,
                          fontSize: '0.9rem'
                        }}
                      >
                        {info.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: info.action ? '#FF6B6B' : 'text.primary',
                          fontWeight: 500
                        }}
                      >
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>

            {/* Mapa */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
              >
                Ubicación en Mapa
              </Typography>
              <Paper
                sx={{
                  overflow: 'hidden',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.2!2d-70.6!3d-33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzAwLjAiUyA3MMKwMzYnMDAuMCJX!5e0!3m2!1ses!2scl!4v1"
                  sx={{
                    width: '100%',
                    height: 250,
                    border: 'none'
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Paper>
            </Box>
          </Box>

          {/* Formulario de Contacto */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 'bold',
                mb: 3,
                color: 'text.primary'
              }}
            >
              Envíanos un Mensaje
            </Typography>

            {submitSuccess && (
              <Alert 
                severity="success" 
                icon={<CheckCircle />}
                sx={{ mb: 3 }}
              >
                ¡Mensaje enviado correctamente! Te responderemos pronto.
              </Alert>
            )}

            <Paper
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 3, md: 4 },
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  name="nombre"
                  label="Nombre Completo"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B6B',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B6B',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="asunto"
                  label="Asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B6B',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="mensaje"
                  label="Mensaje"
                  multiline
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6B6B',
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={<Send />}
                  sx={{
                    backgroundColor: '#FF6B6B',
                    color: 'white',
                    py: 1.5,
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
                    },
                    '&:disabled': {
                      backgroundColor: '#ccc',
                      transform: 'none',
                      boxShadow: 'none',
                    }
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>

        {/* Sección Adicional */}
        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Divider sx={{ mb: 4 }} />
          <Box sx={{ textAlign: 'center' }}>
            <BusinessCenter sx={{ fontSize: '3rem', color: '#FF6B6B', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              ¿Buscas algo específico?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
              Contamos con un amplio catálogo de muebles premium. Si no encuentras lo que buscas, 
              contáctanos y te ayudaremos a encontrar la pieza perfecta para tu hogar.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => window.open('/productos')}
              sx={{
                borderColor: '#FF6B6B',
                color: '#FF6B6B',
                '&:hover': {
                  borderColor: '#ee5a52',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                }
              }}
            >
              Ver Catálogo Completo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;