import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Box,
  Divider
} from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Venta {
  id: number;
  numero_orden: string;
  cliente_final: string;
  producto: string;
  precio: number;
  estado: string;
  estado_pago: string;
  fecha_compra: string;
  codigo_autorizacion?: string;
}

const WebpayCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [infoPago, setInfoPago] = useState<{ codigo: string; monto: number } | null>(null);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);

  useEffect(() => {
    const confirmarYBuscar = async () => {
      const token = searchParams.get("token_ws");
      if (!token) {
        setError('Token de Webpay no encontrado');
        setLoading(false);
        return;
      }

      try {
        const confirmRes = await fetch(`${process.env.REACT_APP_API_URL}/webpay/confirmar?token=${token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const confirmData = await confirmRes.json();

        if (!confirmRes.ok || !confirmData.success) {
          throw new Error(confirmData.error || 'Error al confirmar el pago');
        }

        // Si la confirmación fue exitosa, redirigir a la página de éxito
        if (confirmData.redirect_url) {
          window.location.href = confirmData.redirect_url;
          return;
        }

        // Si no hay URL de redirección, mostrar la información del pago
        setInfoPago({ 
          codigo: confirmData.codigo_autorizacion, 
          monto: confirmData.monto 
        });

        // Obtener detalles de la orden
        const ordenRes = await fetch(`${process.env.REACT_APP_API_URL}/ventas?numero_orden=${confirmData.numero_orden}`);
        if (!ordenRes.ok) throw new Error('No se pudo obtener las órdenes asociadas');

        const data = await ordenRes.json();
        setVentas(data);
      } catch (err) {
        console.error(err);
        setError('Error al procesar el pago. Si ya fue descontado, contáctanos.');
      } finally {
        setLoading(false);
      }
    };

    confirmarYBuscar();
  }, [searchParams]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>Confirmando tu pago...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error || ventas.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Pago fallido</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>{error}</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Volver al inicio</Button>
        </Paper>
      </Container>
    );
  }

  const numeroOrden = ventas[0].numero_orden;
  const cliente = ventas[0].cliente_final;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <SuccessIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" color="success.main" gutterBottom>
          ¡Pago exitoso!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Gracias por tu compra, {cliente}.
        </Typography>

        <Box sx={{ textAlign: 'left', mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            <ReceiptIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Orden #{numeroOrden}
          </Typography>

          {infoPago && (
            <>
              <Typography variant="body2">Código de autorización: {infoPago.codigo}</Typography>
              <Typography variant="body2">Monto total: {formatPrice(infoPago.monto)}</Typography>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {ventas.map((venta, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="body2">Producto: {venta.producto}</Typography>
              <Typography variant="body2">Precio: {formatPrice(venta.precio)}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate('/productos')}
          sx={{ mt: 4 }}
        >
          Seguir comprando
        </Button>
      </Paper>
    </Container>
  );
};

export default WebpayCallback;
