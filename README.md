# Jerkhome CL - E-commerce Platform

Plataforma de comercio electrónico para Jerkhome CL.

## Estructura del Proyecto

```
.
├── frontend/               # Aplicación React
├── jhk-backend-simple/     # Backend FastAPI
├── docker-compose.yml      # Configuración de Docker Compose
├── .env.example           # Variables de entorno de ejemplo
├── deploy.sh              # Script de despliegue
└── setup_vps.sh           # Script de configuración del VPS
```

## Requisitos Previos

- Docker y Docker Compose instalados
- Node.js y npm (para desarrollo local)
- Python 3.9+ (para desarrollo local)
- Git

## Configuración Inicial

1. Clona el repositorio:
   ```bash
   git clone https://github.com/FelipeJS1295/ventasjerkhome.git
   cd ventasjerkhome
   ```

2. Copia el archivo de entorno de ejemplo y configura las variables:
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

## Desarrollo Local

### Usando Docker (Recomendado)

1. Inicia los servicios:
   ```bash
   docker-compose up --build
   ```

2. La aplicación estará disponible en:
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - Adminer (gestor de base de datos): http://localhost:8080

### Sin Docker

#### Backend

1. Crea un entorno virtual:
   ```bash
   cd jhk-backend-simple
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

2. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```

3. Inicia el servidor:
   ```bash
   uvicorn main:app --reload
   ```

#### Frontend

1. Instala dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Inicia la aplicación:
   ```bash
   npm start
   ```

## Despliegue en VPS

### Configuración Inicial del VPS

1. Conéctate a tu VPS:
   ```bash
   ssh root@147.79.74.244
   ```

2. Ejecuta el script de configuración:
   ```bash
   wget https://raw.githubusercontent.com/FelipeJS1295/ventasjerkhome/main/setup_vps.sh
   chmod +x setup_vps.sh
   ./setup_vps.sh
   ```

### Despliegue Automático

1. Asegúrate de que tu clave SSH esté configurada en el VPS
2. Ejecuta el script de despliegue:
   ```bash
   ./deploy.sh production
   ```

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Backend
SECRET_KEY=tu-clave-secreta
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,tudominio.com

# Base de Datos
MYSQL_DATABASE=jerkhome_db
MYSQL_USER=jerkhome_user
MYSQL_PASSWORD=tu-contraseña
MYSQL_ROOT_PASSWORD=tu-contraseña-root
MYSQL_HOST=db
MYSQL_PORT=3306

# Webpay
WEBPAY_COMMERCE_CODE=tu-codigo-comercio
WEBPAY_API_KEY=tu-api-key
WEBPAY_ENVIRONMENT=TEST  # o PRODUCTION para producción

# Frontend
REACT_APP_API_URL=https://tudominio.com/api
REACT_APP_ENV=production
```

## Seguridad

- No expongas nunca las credenciales en el código
- Usa HTTPS en producción
- Mantén actualizadas las dependencias
- Configura un firewall adecuado

## Soporte

Para soporte, contacta al equipo de desarrollo.
