import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const steps = ['Datos del Cliente', 'Resumen y Pago'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [customerData, setCustomerData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    telefono: '',
    direccion: '',
    comuna: '',
    region: 'Metropolitana',
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({ ...prev, [field]: event.target.value }));
    setError('');
  };

  const validateForm = () => {
    const requiredFields = ['nombre', 'apellido', 'rut', 'email', 'telefono', 'direccion', 'comuna'];
    for (const field of requiredFields) {
      if (!customerData[field as keyof typeof customerData]) {
        setError(`El campo ${field} es obligatorio`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      setError('El email no tiene un formato válido');
      return false;
    }
    if (customerData.rut.length < 8) {
      setError('El RUT debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateForm()) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) navigate('/carrito');
    else setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (state.items.length === 0) return setError('Tu carrito está vacío');

    setLoading(true);
    setError('');

    try {
      const productos = state.items.map(item => ({
        producto_id: item.product.id,
        cantidad: item.quantity
      }));

      const ventaData = {
        cliente_final: `${customerData.nombre} ${customerData.apellido}`,
        rut_documento: customerData.rut,
        email: customerData.email,
        telefono: customerData.telefono,
        comuna: customerData.comuna,
        direccion: customerData.direccion,
        region: customerData.region,
        metodo_pago: 'webpay',
        productos
      };

      const ventaRes = await fetch(`${process.env.REACT_APP_API_URL}/ventas/multiple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });

      if (!ventaRes.ok) throw new Error('Error al crear la orden');
      const data = await ventaRes.json();

      const webpayRes = await fetch(`${process.env.REACT_APP_API_URL}/webpay/iniciar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero_orden: data.numero_orden, monto: state.totalAmount })
      });

      if (!webpayRes.ok) throw new Error('Error al iniciar Webpay');
      const webpay = await webpayRes.json();

      clearCart();
      const form = document.createElement("form");
    form.method = "POST";
    form.action = webpay.url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = webpay.token;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    } catch (err) {
      console.error(err);
      setError('No se pudo completar la compra. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5">Tu carrito está vacío</Typography>
          <Button onClick={() => navigate('/productos')} variant="contained" sx={{ mt: 3 }}>Ver productos</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2, color: '#FF6B6B' }}>
          {activeStep === 0 ? 'Volver al Carrito' : 'Atrás'}
        </Button>
        <Typography variant="h4">Finalizar Compra</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          {activeStep === 0 ? (
            <Paper elevation={0} sx={{ p: 4 }}>
              <Typography variant="h6"><PersonIcon sx={{ mr: 1 }} />Datos del Cliente</Typography>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" value={customerData.nombre} onChange={handleInputChange('nombre')} fullWidth />
                <TextField label="Apellido" value={customerData.apellido} onChange={handleInputChange('apellido')} fullWidth />
                <TextField label="RUT" value={customerData.rut} onChange={handleInputChange('rut')} fullWidth />
                <TextField label="Email" value={customerData.email} onChange={handleInputChange('email')} fullWidth />
                <TextField label="Teléfono" value={customerData.telefono} onChange={handleInputChange('telefono')} fullWidth />
                <TextField label="Dirección" value={customerData.direccion} onChange={handleInputChange('direccion')} fullWidth />
                <TextField label="Comuna" value={customerData.comuna} onChange={handleInputChange('comuna')} fullWidth />
                <FormControl fullWidth>
                  <InputLabel>Región</InputLabel>
                  <Select value={customerData.region} onChange={(e) => setCustomerData(prev => ({ ...prev, region: e.target.value }))}>
                    <MenuItem value="Metropolitana">Metropolitana</MenuItem>
                    <MenuItem value="Valparaíso">Valparaíso</MenuItem>
                    <MenuItem value="Biobío">Biobío</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ p: 4 }}>
              <Typography variant="h6"><PaymentIcon sx={{ mr: 1 }} />Método de Pago</Typography>
              <FormControl component="fieldset" sx={{ mt: 3 }}>
                <FormLabel component="legend">Selecciona tu método de pago</FormLabel>
                <RadioGroup defaultValue="webpay" sx={{ mt: 2 }}>
                  <FormControlLabel value="webpay" control={<Radio />} label="Webpay (Tarjeta)" />
                  <FormControlLabel value="transferencia" control={<Radio disabled />} label="Transferencia" />
                </RadioGroup>
              </FormControl>
            </Paper>
          )}
        </Box>

        <Box sx={{ width: { xs: '100%', md: 350 }, flexShrink: 0 }}>
          <Paper elevation={0} sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h6">Resumen del Pedido</Typography>
            <Box sx={{ mb: 3 }}>
              {state.items.map((item) => (
                <Box key={item.product.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.product.nombre} × {item.quantity}</Typography>
                  <Typography variant="body2" fontWeight="bold">{formatPrice((item.product.precio_descuento || item.product.precio_venta) * item.quantity)}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="#FF6B6B">{formatPrice(state.totalAmount)}</Typography>
            </Box>
            <Button fullWidth variant="contained" onClick={activeStep === 0 ? handleNext : handleSubmit} disabled={loading} sx={{ mt: 3 }}>
              {loading ? 'Procesando...' : (activeStep === 0 ? 'Continuar' : 'Pagar con Webpay')}
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
