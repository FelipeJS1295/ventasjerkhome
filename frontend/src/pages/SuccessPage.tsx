import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  Link
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState('');

  useEffect(() => {
    const ordenParam = searchParams.get('orden');
    if (ordenParam) {
      setOrden(ordenParam);
    }
  }, [searchParams]);

  return (
    <Container maxWidth="md" sx={{ py: 8, minHeight: '70vh' }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon 
          color="success" 
          sx={{ fontSize: 80, mb: 3 }} 
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Pago Completado con Éxito!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          Gracias por tu compra en JHK Muebles
        </Typography>

        {orden && (
          <Box sx={{ my: 4 }}>
            <Typography variant="body1" gutterBottom>
              Número de orden: <strong>{orden}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hemos enviado los detalles de tu compra a tu correo electrónico.
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none' }}
          >
            Volver al inicio
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ReceiptIcon />}
            onClick={() => navigate(`/mis-ordenes/${orden}`)}
            disabled={!orden}
            sx={{ textTransform: 'none' }}
          >
            Ver mi orden
          </Button>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
          <Typography variant="body2" color="text.secondary">
            ¿Tienes alguna pregunta?{' '}
            <Link href="/contacto" color="primary">
              Contáctanos
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuccessPage;
