// Configuración modular para la página de inicio
// Cambia aquí el contenido para actualizar promociones, banners, etc.

export interface HomeConfig {
  sections: {
    heroBanner: {
      enabled: boolean;
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      backgroundImage?: string;
      backgroundColor: string;
      textColor: string;
      showPromotion: boolean;
      promotionText?: string;
    };
    featuredCategories: {
      enabled: boolean;
      title: string;
      subtitle: string;
      categories: Array<{
        name: string;
        displayName: string;
        description: string;
        icon: string;
        color: string;
        link: string;
      }>;
    };
    promotional: {
      enabled: boolean;
      type: 'banner' | 'card' | 'video';
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      backgroundColor: string;
      textColor: string;
      image?: string;
    };
    featuredProducts: {
      enabled: boolean;
      title: string;
      subtitle: string;
      showDiscountBadge: boolean;
      maxProducts: number;
    };
    benefits: {
      enabled: boolean;
      title: string;
      items: Array<{
        icon: string;
        title: string;
        description: string;
        color: string;
      }>;
    };
  };
}

export const homeConfig: HomeConfig = {
  sections: {
    // BANNER PRINCIPAL - Fácil de cambiar para promociones
    heroBanner: {
      enabled: true,
      title: "JERK HOME",
      subtitle: "Muebles Premium para tu Hogar",
      description: "Descubre nuestra colección exclusiva de sofás, camas y seccionales de la más alta calidad. Diseño, comodidad y elegancia en cada pieza.",
      buttonText: "Ver Catálogo",
      buttonLink: "/productos",
      backgroundColor: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      textColor: "#ffffff",
      showPromotion: true,
      promotionText: "🔥 HASTA 40% OFF EN PRODUCTOS SELECCIONADOS"
    },

    // CATEGORÍAS DESTACADAS
    featuredCategories: {
      enabled: true,
      title: "Nuestras Categorías",
      subtitle: "Encuentra el mueble perfecto para cada espacio de tu hogar",
      categories: [
        {
          name: "sofas",
          displayName: "Sofás",
          description: "Comodidad y estilo para tu sala de estar",
          icon: "Weekend",
          color: "#FF6B6B",
          link: "/productos?tipo=sofas"
        },
        {
          name: "seccionales", 
          displayName: "Seccionales",
          description: "Espacios amplios con máximo confort",
          icon: "EventSeat",
          color: "#4ECDC4",
          link: "/productos?tipo=seccionales"
        },
        {
          name: "poltronas",
          displayName: "Poltronas", 
          description: "Relajación individual de primera clase",
          icon: "Chair",
          color: "#45B7D1",
          link: "/productos?tipo=poltronas"
        },
        {
          name: "camas",
          displayName: "Camas",
          description: "Descanso perfecto todas las noches",
          icon: "Bed",
          color: "#96CEB4",
          link: "/productos?tipo=camas"
        }
      ]
    },

    // SECCIÓN PROMOCIONAL - Para campañas especiales
    promotional: {
      enabled: true,
      type: "banner",
      title: "¡OFERTA ESPECIAL!",
      subtitle: "Aprovecha nuestras promociones exclusivas",
      description: "Encuentra increíbles descuentos en nuestra selección de muebles premium. Calidad excepcional a precios únicos.",
      buttonText: "Ver Ofertas",
      buttonLink: "/productos?ordenar_por=descuento",
      backgroundColor: "linear-gradient(135deg, #FF6B6B 0%, #ee5a52 100%)",
      textColor: "#ffffff",
      image: "/promocion-banner.jpg"
    },

    // PRODUCTOS DESTACADOS
    featuredProducts: {
      enabled: true,
      title: "Productos Destacados",
      subtitle: "Los favoritos de nuestros clientes",
      showDiscountBadge: true,
      maxProducts: 8
    },

    // BENEFICIOS DE COMPRAR CON NOSOTROS
    benefits: {
      enabled: true,
      title: "¿Por qué elegir JERK HOME?",
      items: [
        {
          icon: "LocalShipping",
          title: "Envío Gratis",
          description: "Envío gratuito a todo Chile en compras sobre $50.000",
          color: "#FF6B6B"
        },
        {
          icon: "Build",
          title: "Instalación Incluida", 
          description: "Instalación profesional sin costo adicional",
          color: "#4ECDC4"
        },
        {
          icon: "Security",
          title: "Garantía 2 Años",
          description: "Garantía completa en todos nuestros productos",
          color: "#45B7D1"
        },
        {
          icon: "Support",
          title: "Atención 24/7",
          description: "Soporte técnico disponible todos los días",
          color: "#96CEB4"
        },
        {
          icon: "Payment",
          title: "Pago Seguro",
          description: "Múltiples métodos de pago 100% seguros",
          color: "#F7DC6F"
        },
        {
          icon: "ThumbUp",
          title: "Satisfacción Garantizada",
          description: "30 días para devolución sin preguntas",
          color: "#BB8FCE"
        }
      ]
    }
  }
};

// CONFIGURACIONES RÁPIDAS PARA PROMOCIONES
// Descomenta y modifica según la promoción activa:

/* 
// CONFIGURACIÓN BLACK FRIDAY
export const blackFridayConfig: Partial<HomeConfig> = {
  sections: {
    heroBanner: {
      ...homeConfig.sections.heroBanner,
      title: "BLACK FRIDAY",
      subtitle: "¡Los mejores descuentos del año!",
      promotionText: "🖤 HASTA 70% OFF - SOLO HOY",
      backgroundColor: "linear-gradient(135deg, #000000 0%, #333333 100%)",
    },
    promotional: {
      ...homeConfig.sections.promotional,
      title: "BLACK FRIDAY ESPECIAL",
      subtitle: "Descuentos únicos por tiempo limitado",
      backgroundColor: "linear-gradient(135deg, #000000 0%, #FF6B6B 100%)",
    }
  }
};
*/

/*
// CONFIGURACIÓN NAVIDAD
export const christmasConfig: Partial<HomeConfig> = {
  sections: {
    heroBanner: {
      ...homeConfig.sections.heroBanner,
      title: "ESPECIAL NAVIDAD",
      subtitle: "Regalos perfectos para tu hogar",
      promotionText: "🎄 ENVÍO EXPRESS GRATIS HASTA EL 24 DIC",
      backgroundColor: "linear-gradient(135deg, #2E8B57 0%, #228B22 100%)",
    }
  }
};
*/

/*
// CONFIGURACIÓN CYBER MONDAY  
export const cyberMondayConfig: Partial<HomeConfig> = {
  sections: {
    heroBanner: {
      ...homeConfig.sections.heroBanner,
      title: "CYBER MONDAY",
      subtitle: "Ofertas digitales exclusivas",
      promotionText: "💻 DESCUENTOS ONLINE ÚNICOS",
      backgroundColor: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
    }
  }
};
*/