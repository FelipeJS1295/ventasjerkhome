import { api } from './api';
import { Product, TipoProductoEnum } from '../types/Product';

interface ProductFilters {
  skip?: number;
  limit?: number;
  tipo_producto?: TipoProductoEnum;
  precio_min?: number;
  precio_max?: number;
  search?: string;
}

export const productService = {
  // Obtener todos los productos con filtros
  getProducts: async (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.skip) params.append('skip', filters.skip.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.tipo_producto) params.append('tipo', filters.tipo_producto);
    if (filters.precio_min) params.append('precio_min', filters.precio_min.toString());
    if (filters.precio_max) params.append('precio_max', filters.precio_max.toString());
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/productos/?${params}`);
    
    return {
      productos: response.data,
      total: response.data.length,
      page: 1,
      per_page: response.data.length
    };
  },

  // Obtener producto por ID
  getProduct: async (id: number) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  }
};