from sqlalchemy import Column, Integer, String, Float, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String, Text, Enum as SQLEnum, TIMESTAMP, func


# Cargar variables de entorno
load_dotenv()

# Configuración de base de datos
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "integracion")
DB_PORT = os.getenv("DB_PORT", "3306")

# URL de conexión a MySQL
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Crear engine y sesión
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos de base de datos
class Producto(Base):
    __tablename__ = "productos"
    
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(255), index=True)
    nombre = Column(String(255))
    precio_venta = Column(Float)
    tipo_producto = Column(String(50))
    descripcion_producto = Column(Text)
    img_1 = Column(String(255))
    img_2 = Column(String(255))
    img_3 = Column(String(255))
    img_4 = Column(String(255))
    img_5 = Column(String(255))
    img_6 = Column(String(255))
    img_7 = Column(String(255))
    img_8 = Column(String(255))
    img_9 = Column(String(255))
    img_10 = Column(String(255))
    precio_descuento = Column(Float)
    tipo_producto_venta = Column(String(50))
    visitas = Column(Integer, default=0)
    dimensiones = Column(String(255))
    material = Column(String(255))
    colores_disponibles = Column(Text)
    tiempo_entrega = Column(String(255))
    colores_hex = Column(Text)

class VentaRetail(Base):
    __tablename__ = "ventas_retail"
    
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer)
    numero_orden = Column(String(20), unique=True, index=True)
    cliente_final = Column(String(255))
    rut_documento = Column(String(50))
    email = Column(String(255))
    telefono = Column(String(50))
    fecha_compra = Column(DateTime, default=datetime.now)
    fecha_entrega = Column(DateTime)
    producto = Column(String(255))
    precio = Column(Float)
    costo_despacho = Column(Float, default=0)
    comuna = Column(String(100))
    direccion = Column(String(500))
    region = Column(String(100))
    sku = Column(String(255))
    estado = Column(String(50), default="nueva")
    unidades = Column(Integer, default=1)
    metodo_pago = Column(String(50))
    fecha_pago = Column(DateTime)
    codigo_autorizacion = Column(String(255))
    estado_pago = Column(String(50), default="pendiente")

class LogsWebpay(Base):
    __tablename__ = "logs_webpay"
    
    id = Column(Integer, primary_key=True, index=True)
    numero_orden = Column(String(50), nullable=True)
    token = Column(String(100), nullable=True)
    tipo = Column(SQLEnum('error_inicio', 'error_confirmacion', 'info'), nullable=False)
    mensaje = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())

class TransaccionesWebpay(Base):
    __tablename__ = "transacciones_webpay"
    
    id = Column(Integer, primary_key=True, index=True)
    numero_orden = Column(String(50), nullable=False)
    token = Column(String(100), nullable=True)
    session_id = Column(String(100), nullable=True)
    monto = Column(Integer, nullable=False)
    estado = Column(SQLEnum('iniciada', 'completada', 'fallida', 'anulada'), nullable=True, default='iniciada')
    authorization_code = Column(String(20), nullable=True)
    payment_type_code = Column(String(5), nullable=True)
    response_code = Column(String(10), nullable=True)
    resultado_completo = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, default=func.current_timestamp(), onupdate=func.current_timestamp())

# Función para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()