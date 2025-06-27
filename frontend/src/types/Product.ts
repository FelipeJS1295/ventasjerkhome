export enum TipoProductoEnum {
  SECCIONALES = 'seccionales',
  POLTRONAS = 'poltronas', 
  SOFAS = 'sofas',
  CAMAS = 'camas'
}

export interface Product {
  id: number;
  sku: string;
  nombre: string;
  precio_venta: number;
  tipo_producto: TipoProductoEnum;
  descripcion_producto?: string;
  precio_descuento?: number;
  dimensiones?: string;
  material?: string;
  colores_disponibles?: string;
  tiempo_entrega?: string;
  colores_hex?: string;
  visitas: number;
  imagenes: string[];
  created_at: string;
  updated_at?: string;
}

export interface ProductResponse {
  productos: Product[];
  total: number;
  page: number;
  per_page: number;
}