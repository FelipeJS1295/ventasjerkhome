import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types/Product';

// Tipos para el carrito
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isOpen: boolean;
}

// Tipos de acciones para el reducer
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

// Estado inicial del carrito
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
};

// Función para calcular totales
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.product.precio_descuento || item.product.precio_venta || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  return { totalItems, totalAmount };
};

// Función para guardar en localStorage
const saveToLocalStorage = (state: CartState) => {
  try {
    const cartData = {
      items: state.items,
      totalItems: state.totalItems,
      totalAmount: state.totalAmount
    };
    localStorage.setItem('jerkhome_cart', JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Función para cargar de localStorage
const loadFromLocalStorage = (): Partial<CartState> => {
  try {
    const savedCart = localStorage.getItem('jerkhome_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {};
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo
        const newItem: CartItem = {
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
          addedAt: new Date()
        };
        newItems = [...state.items, newItem];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      
      newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
      break;
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      const { totalItems, totalAmount } = calculateTotals(newItems);
      
      newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, remover el item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const newItems = state.items.map(item =>
        item.product.id === id
          ? { ...item, quantity }
          : item
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      
      newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
      break;
    }

    case 'CLEAR_CART': {
      newState = {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };
      break;
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case 'OPEN_CART': {
      return {
        ...state,
        isOpen: true,
      };
    }

    case 'CLOSE_CART': {
      return {
        ...state,
        isOpen: false,
      };
    }

    case 'LOAD_CART': {
      return {
        ...state,
        ...action.payload,
        isOpen: false, // Siempre cerrado al cargar
      };
    }

    default:
      return state;
  }

  // Guardar en localStorage después de cada cambio (excepto toggle/open/close)
  if (!['TOGGLE_CART', 'OPEN_CART', 'CLOSE_CART'].includes(action.type)) {
    saveToLocalStorage(newState);
  }

  return newState;
};

// Context
interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    const savedCart = loadFromLocalStorage();
    if (savedCart && savedCart.items && savedCart.items.length > 0) {
      dispatch({ 
        type: 'LOAD_CART', 
        payload: { ...initialState, ...savedCart } 
      });
    }
  }, []);

  // Funciones del context
  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;