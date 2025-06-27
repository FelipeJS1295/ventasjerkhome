import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container,
    IconButton,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import {
    ShoppingCart,
    AccountCircle,
    Menu as MenuIcon,
    Close as CloseIcon,
    Home,
    Inventory,
    ContactMail,
    Info,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { state: cartState, toggleCart } = useCart();

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false); // Cerrar menú móvil al navegar
    };

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const menuItems = [
        { label: 'INICIO', path: '/', icon: <Home /> },
        { label: 'PRODUCTOS', path: '/productos', icon: <Inventory /> },
        { label: 'NOSOTROS', path: '/nosotros', icon: <Info /> },
        { label: 'CONTACTO', path: '/contacto', icon: <ContactMail /> },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'linear-gradient(90deg, #121212 0%, #1E1E1E 50%, #121212 100%)',
                borderBottom: '1px solid rgba(255, 107, 107, 0.2)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* Logo */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: { xs: 1, md: 2 }, 
                            cursor: 'pointer',
                            flex: 1
                        }}
                        onClick={() => handleNavigation('/')}
                    >
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="Jerk Home"
                            sx={{
                                height: { xs: 35, md: 50 },
                                width: 'auto',
                                filter: 'brightness(1.1)'
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 300,
                                color: 'primary.main',
                                letterSpacing: { xs: '1px', md: '2px' },
                                textTransform: 'uppercase',
                                fontSize: { xs: '1.2rem', md: '1.5rem' }
                            }}
                        >
                            Jerk Home
                        </Typography>
                    </Box>

                    {/* Navegación Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                        {menuItems.map((item) => (
                            <Typography
                                key={item.path}
                                component="span"
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    fontSize: '1rem',
                                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                    textDecoration: 'none',
                                    fontWeight: isActive(item.path) ? 600 : 400,
                                    letterSpacing: '1px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-5px',
                                        left: 0,
                                        width: isActive(item.path) ? '100%' : 0,
                                        height: '2px',
                                        backgroundColor: 'primary.main',
                                        transition: 'width 0.4s ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    }
                                }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Box>

                    {/* Acciones */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                        {/* Botón de cuenta */}
                        <IconButton
                            color="inherit"
                            size={window.innerWidth < 768 ? 'small' : 'medium'}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <AccountCircle />
                        </IconButton>

                        {/* Carrito */}
                        <IconButton
                            color="inherit"
                            size={window.innerWidth < 768 ? 'small' : 'medium'}
                            onClick={toggleCart}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <Badge 
                                badgeContent={cartState.totalItems} 
                                color="primary"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#FF6B6B',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                        {/* Menú hamburguesa (solo móvil) */}
                        <IconButton
                            color="inherit"
                            onClick={toggleMobileMenu}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                '&:hover': {
                                    color: 'primary.main',
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            {/* Drawer para menú móvil */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        backgroundColor: '#1E1E1E',
                        color: 'white',
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    {/* Header del drawer */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 2
                    }}>
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            JERK HOME
                        </Typography>
                        <IconButton 
                            onClick={() => setMobileMenuOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ backgroundColor: 'rgba(255, 107, 107, 0.3)', mb: 2 }} />

                    {/* Items del menú */}
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    mb: 1,
                                    backgroundColor: isActive(item.path) 
                                        ? 'rgba(255, 107, 107, 0.2)' 
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                    },
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                <ListItemIcon sx={{ 
                                    color: isActive(item.path) ? 'primary.main' : 'white',
                                    minWidth: 40
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.label}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: isActive(item.path) ? 'primary.main' : 'white',
                                            fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                            letterSpacing: '1px'
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ backgroundColor: 'rgba(255, 107, 107, 0.3)', my: 2 }} />

                    {/* Acciones adicionales en móvil */}
                    <List>
                        <ListItem
                            onClick={toggleCart}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                <Badge 
                                    badgeContent={cartState.totalItems} 
                                    color="primary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#FF6B6B',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                >
                                    <ShoppingCart />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText 
                                primary="CARRITO"
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: 'white',
                                        letterSpacing: '1px'
                                    }
                                }}
                            />
                        </ListItem>

                        <ListItem
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText 
                                primary="MI CUENTA"
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: 'white',
                                        letterSpacing: '1px'
                                    }
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};