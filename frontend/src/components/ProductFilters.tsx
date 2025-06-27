import React from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Typography,
    InputAdornment,
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { TipoProductoEnum } from '../types/Product';

interface ProductFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    priceRange: string;
    onPriceRangeChange: (value: string) => void;
    totalProducts: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    priceRange,
    onPriceRangeChange,
    totalProducts,
}) => {
    const categories = [
        { value: '', label: 'Todas las categorías' },
        { value: TipoProductoEnum.SOFAS, label: 'Sofás' },
        { value: TipoProductoEnum.SECCIONALES, label: 'Seccionales' },
        { value: TipoProductoEnum.POLTRONAS, label: 'Poltronas' },
        { value: TipoProductoEnum.CAMAS, label: 'Camas' },
    ];

    const sortOptions = [
        { value: 'relevancia', label: 'Más relevante' },
        { value: 'precio_asc', label: 'Precio: menor a mayor' },
        { value: 'precio_desc', label: 'Precio: mayor a menor' },
        { value: 'nombre_asc', label: 'Nombre: A-Z' },
        { value: 'visitas_desc', label: 'Más populares' },
    ];

    const priceRanges = [
        { value: '', label: 'Todos los precios' },
        { value: '0-100000', label: 'Hasta $100.000' },
        { value: '100000-300000', label: '$100.000 - $300.000' },
        { value: '300000-500000', label: '$300.000 - $500.000' },
        { value: '500000-1000000', label: '$500.000 - $1.000.000' },
        { value: '1000000-999999999', label: 'Más de $1.000.000' },
    ];

    return (
        <Box sx={{ mb: 4 }}>
            {/* Header de filtros */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <FilterList sx={{ color: 'primary.main' }} />
                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.primary',
                        letterSpacing: '1px',
                        fontWeight: 300
                    }}
                >
                    FILTROS
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        ml: 'auto'
                    }}
                >
                    {totalProducts} productos encontrados
                </Typography>
            </Box>

            {/* Barra de búsqueda */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar muebles..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: 'primary.main' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 107, 107, 0.2)',
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: 'rgba(255, 107, 107, 0.4)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'primary.main',
                                boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.1)',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'text.primary',
                            '&::placeholder': {
                                color: 'text.secondary',
                                opacity: 0.8,
                            },
                        },
                    }}
                />
            </Box>

            {/* Filtros en línea */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {/* Categoría */}
                <FormControl
                    size="small"
                    sx={{ minWidth: 200 }}
                >
                    <InputLabel
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-focused': { color: 'primary.main' }
                        }}
                    >
                        Categoría
                    </InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value as string)}
                        label="Categoría"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 107, 107, 0.2)',
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: 'rgba(255, 107, 107, 0.4)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'primary.main',
                            },
                            '& .MuiSelect-select': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Ordenar por */}
                <FormControl
                    size="small"
                    sx={{ minWidth: 200 }}
                >
                    <InputLabel
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-focused': { color: 'primary.main' }
                        }}
                    >
                        Ordenar por
                    </InputLabel>
                    <Select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as string)}
                        label="Ordenar por"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 107, 107, 0.2)',
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: 'rgba(255, 107, 107, 0.4)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'primary.main',
                            },
                            '& .MuiSelect-select': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Rango de precios */}
                <FormControl
                    size="small"
                    sx={{ minWidth: 200 }}
                >
                    <InputLabel
                        sx={{
                            color: 'text.secondary',
                            '&.Mui-focused': { color: 'primary.main' }
                        }}
                    >
                        Precio
                    </InputLabel>
                    <Select
                        value={priceRange}
                        onChange={(e) => onPriceRangeChange(e.target.value as string)}
                        label="Precio"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 107, 107, 0.2)',
                            borderRadius: '8px',
                            '&:hover': {
                                borderColor: 'rgba(255, 107, 107, 0.4)',
                            },
                            '&.Mui-focused': {
                                borderColor: 'primary.main',
                            },
                            '& .MuiSelect-select': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        {priceRanges.map((range) => (
                            <MenuItem key={range.value} value={range.value}>
                                {range.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Chips de filtros activos */}
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedCategory && (
                    <Chip
                        label={categories.find(c => c.value === selectedCategory)?.label}
                        onDelete={() => onCategoryChange('')}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            color: 'primary.main',
                            border: '1px solid rgba(255, 107, 107, 0.3)',
                            '& .MuiChip-deleteIcon': {
                                color: 'primary.main',
                            },
                        }}
                    />
                )}
                {priceRange && (
                    <Chip
                        label={priceRanges.find(p => p.value === priceRange)?.label}
                        onDelete={() => onPriceRangeChange('')}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            color: 'primary.main',
                            border: '1px solid rgba(255, 107, 107, 0.3)',
                            '& .MuiChip-deleteIcon': {
                                color: 'primary.main',
                            },
                        }}
                    />
                )}
                {searchTerm && (
                    <Chip
                        label={`Búsqueda: "${searchTerm}"`}
                        onDelete={() => onSearchChange('')}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            color: 'primary.main',
                            border: '1px solid rgba(255, 107, 107, 0.3)',
                            '& .MuiChip-deleteIcon': {
                                color: 'primary.main',
                            },
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};