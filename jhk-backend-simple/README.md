# JHK Muebles - Backend API

Backend simple para la tienda de muebles JHK usando FastAPI y MySQL.

## 🚀 Instalación

```bash
# 1. Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Configurar variables de entorno
# Editar archivo .env con tu configuración de MySQL

# 4. Ejecutar la API
uvicorn main:app --reload --port 8000
```

## 📋 Endpoints Disponibles

### Productos
- `GET /productos` - Listar todos los productos
- `GET /productos/{id}` - Obtener detalle de un producto (incrementa visitas)
- `GET /productos?tipo=sofas` - Filtrar productos por tipo

### Ventas
- `POST /ventas` - Crear nueva orden de compra
- `GET /ventas/{numero_orden}` - Obtener estado de una orden

### Webpay (Simulado para desarrollo)
- `POST /webpay/iniciar` - Iniciar proceso de pago
- `POST /webpay/confirmar` - Confirmar pago
- `GET /webpay/formulario?token=xxx` - Formulario simulado

### Imágenes
- `GET /static/productos/{filename}` - Servir imágenes de productos

### Documentación
- `GET /docs` - Documentación automática de FastAPI
- `GET /health` - Estado de la API

## 🗄️ Base de Datos

La API se conecta a una base de datos MySQL existente llamada `integracion` con las siguientes tablas:

- `productos` - Catálogo de muebles
- `ventas_retail` - Órdenes de compra
- `logs_webpay` - Logs de transacciones
- `transacciones_webpay` - Transacciones de pago

## 📁 Estructura del Proyecto

```
jhk-backend-simple/
├── main.py              # API principal con todos los endpoints
├── models.py            # Modelos SQLAlchemy para MySQL
├── requirements.txt     # Dependencias de Python
├── .env                 # Variables de entorno
└── README.md           # Este archivo
```

## 🔧 Configuración

Archivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=integracion
DB_PORT=3306
IMAGES_PATH=/var/www/imagenes_jhk/productos
DEBUG=True
ENVIRONMENT=development
WEBPAY_ENVIRONMENT=development
```

## 🧪 Probar la API

Una vez ejecutando en `http://localhost:8000`:

1. **Ver productos:** `http://localhost:8000/productos`
2. **Documentación:** `http://localhost:8000/docs`
3. **Crear orden:** POST a `/ventas` con datos del cliente
4. **Iniciar pago:** POST a `/webpay/iniciar` con número de orden

## 📝 Ejemplo de Uso

### Crear una orden de compra:
```json
POST /ventas
{
  "cliente_final": "Juan Pérez",
  "rut_documento": "12345678-9",
  "email": "juan@example.com",
  "telefono": "+56912345678",
  "producto_id": 1,
  "comuna": "Las Condes",
  "direccion": "Av. Providencia 123",
  "region": "Metropolitana",
  "metodo_pago": "webpay"
}
```

### Iniciar pago con Webpay:
```json
POST /webpay/iniciar
{
  "numero_orden": "123456789",
  "monto": 299990
}
```

## 🔍 Logs

La API registra automáticamente:
- Todas las transacciones de Webpay en `logs_webpay`
- Estados de transacciones en `transacciones_webpay`
- Incremento de visitas en productos

## 🚀 Producción

Para desplegar en producción:
1. Cambiar variables en `.env` para el servidor de producción
2. Configurar Nginx para servir la API
3. Usar un servidor WSGI como Gunicorn
4. Configurar SSL/HTTPS
5. Integrar con Webpay real de Transbank

---

**✅ API JHK Muebles funcionando correctamente**