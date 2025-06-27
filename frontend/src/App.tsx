import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Products } from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import WebpayCallback from './pages/WebpayCallback';
import SuccessPage from './pages/SuccessPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              background: 'linear-gradient(180deg, #121212 0%, #1E1E1E 50%, #121212 100%)',
            }}
          >
            <Header />

            <Box
              component="main"
              sx={{
                flex: 1,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inicio" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/productos/:id" element={<ProductDetail />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/exito" element={<SuccessPage />} />
                <Route path="/webpay/callback" element={<WebpayCallback />} />
              </Routes>
            </Box>

            <Footer />
            
            {/* Cart Drawer */}
            <CartDrawer />
          </Box>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;