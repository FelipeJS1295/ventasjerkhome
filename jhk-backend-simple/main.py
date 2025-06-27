from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random
import string
import os
import json
from typing import List
from pydantic import BaseModel
from fastapi import Query
from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.options import WebpayOptions
from transbank.common.integration_type import IntegrationType
from fastapi import Form, Request
from fastapi import Request, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse

from models import get_db, Producto, VentaRetail, LogsWebpay, TransaccionesWebpay

# Crear aplicación FastAPI
app = FastAPI(
    title="JHK Muebles API",
    description="API simple para tienda de muebles JHK",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COMMERCE_CODE = "597055555532"
API_KEY = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"

webpay_options = WebpayOptions(
    commerce_code=COMMERCE_CODE,
    api_key=API_KEY,
    integration_type=IntegrationType.TEST
)

transaction = Transaction(webpay_options)

# Servir imágenes estáticas
IMAGES_PATH = os.getenv("IMAGES_PATH", "/var/www/imagenes_jhk/productos")
if os.path.exists(IMAGES_PATH):
    app.mount("/static/productos", StaticFiles(directory=IMAGES_PATH), name="productos")

# Esquemas Pydantic básicos
class ProductoResponse(BaseModel):
    id: int
    sku: Optional[str] = None
    nombre: Optional[str] = None
    precio_venta: Optional[float] = None
    tipo_producto: Optional[str] = None
    descripcion_producto: Optional[str] = None
    precio_descuento: Optional[float] = None
    visitas: Optional[int] = 0
    dimensiones: Optional[str] = None
    material: Optional[str] = None
    tiempo_entrega: Optional[str] = None
    imagenes: List[str] = []

class VentaCreate(BaseModel):
    cliente_final: str
    rut_documento: str
    email: str
    telefono: str
    producto_id: int
    comuna: str
    direccion: str
    region: str
    metodo_pago: str = "webpay"

class VentaResponse(BaseModel):
    id: int
    numero_orden: str
    cliente_final: str
    producto: str
    precio: float
    estado: str
    estado_pago: str
    fecha_compra: datetime

class WebpayRequest(BaseModel):
    numero_orden: str
    monto: float

class ProductoEnVenta(BaseModel):
    producto_id: int
    cantidad: int
    
class VentaMultipleCreate(BaseModel):
    cliente_final: str
    rut_documento: str
    email: str
    telefono: str
    comuna: str
    direccion: str
    region: str
    metodo_pago: str = "webpay"
    productos: List[ProductoEnVenta]

@app.post("/ventas/multiple")
def crear_venta_multiple(data: VentaMultipleCreate, db: Session = Depends(get_db)):
    fecha_compra = datetime.now()
    numero_orden = generar_numero_orden()
    ventas_creadas = []

    for item in data.productos:
        producto = db.query(Producto).filter(Producto.id == item.producto_id).first()
        if not producto:
            continue

        for _ in range(item.cantidad):
            venta = VentaRetail(
                cliente_id=9,
                numero_orden=numero_orden,
                cliente_final=data.cliente_final,
                rut_documento=data.rut_documento,
                email=data.email,
                telefono=data.telefono,
                fecha_compra=fecha_compra,
                fecha_entrega=calcular_fecha_entrega(fecha_compra),
                producto=producto.nombre,
                precio=producto.precio_descuento or producto.precio_venta,
                comuna=data.comuna,
                direccion=data.direccion,
                region=data.region,
                sku=producto.sku,
                metodo_pago=data.metodo_pago,
                estado="nueva",
                estado_pago="pendiente"
            )
            db.add(venta)
            ventas_creadas.append(venta)

    db.commit()
    return {"numero_orden": numero_orden, "ventas": [v.id for v in ventas_creadas]}

@app.get("/ventas")
def obtener_ventas_por_numero_orden(numero_orden: str = Query(...), db: Session = Depends(get_db)):
    ventas = db.query(VentaRetail).filter(VentaRetail.numero_orden == numero_orden).all()
    if not ventas:
        raise HTTPException(status_code=404, detail="No se encontraron ventas con ese número de orden")

    return [
        {
            "id": v.id,
            "numero_orden": v.numero_orden,
            "cliente_final": v.cliente_final,
            "producto": v.producto,
            "precio": v.precio,
            "estado": v.estado,
            "estado_pago": v.estado_pago,
            "fecha_compra": v.fecha_compra,
            "codigo_autorizacion": v.codigo_autorizacion
        }
        for v in ventas
    ]

# Funciones de utilidad
def generar_numero_orden():
    return ''.join(random.choices(string.digits, k=9))

def generar_cliente_id():
    return random.randint(100000000, 999999999)

def calcular_fecha_entrega(fecha_compra: datetime):
    dias_agregados = 0
    fecha_actual = fecha_compra
    
    while dias_agregados < 3:
        fecha_actual += timedelta(days=1)
        if fecha_actual.weekday() < 5:  # No es fin de semana
            dias_agregados += 1
    
    return fecha_actual

def obtener_imagenes_producto(producto):
    imagenes = []
    for i in range(1, 11):
        img = getattr(producto, f'img_{i}')
        if img:
            imagenes.append(f"/static/productos/{img}")
    return imagenes

# ENDPOINTS

@app.get("/")
def root():
    return {"message": "JHK Muebles API - Funcionando correctamente"}

@app.get("/productos", response_model=List[ProductoResponse]) 
def listar_productos(
    skip: int = 0, 
    limit: int = 50, 
    tipo: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Listar productos del catálogo (solo tipo_producto_venta = 'local')"""
    query = db.query(Producto).filter(Producto.tipo_producto_venta == "local")
    
    if tipo:
        query = query.filter(Producto.tipo_producto == tipo)
    
    productos = query.offset(skip).limit(limit).all()
    
    productos_response = []
    for producto in productos:
        producto_dict = {
            "id": producto.id,
            "sku": producto.sku,
            "nombre": producto.nombre,
            "precio_venta": producto.precio_venta,
            "tipo_producto": producto.tipo_producto,
            "descripcion_producto": producto.descripcion_producto,
            "precio_descuento": producto.precio_descuento,
            "visitas": producto.visitas,
            "dimensiones": producto.dimensiones,
            "material": producto.material,
            "tiempo_entrega": producto.tiempo_entrega,
            "imagenes": obtener_imagenes_producto(producto)
        }
        productos_response.append(producto_dict)
    
    return productos_response

@app.get("/productos/{producto_id}", response_model=ProductoResponse)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):
    """Obtener detalle de un producto (solo si tipo_producto_venta = 'local')"""
    producto = db.query(Producto).filter(
        Producto.id == producto_id,
        Producto.tipo_producto_venta == "local"
    ).first()
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado o no disponible para venta local")
    
    # Incrementar visitas
    producto.visitas += 1
    db.commit()
    
    return {
        "id": producto.id,
        "sku": producto.sku,
        "nombre": producto.nombre,
        "precio_venta": producto.precio_venta,
        "tipo_producto": producto.tipo_producto,
        "descripcion_producto": producto.descripcion_producto,
        "precio_descuento": producto.precio_descuento,
        "visitas": producto.visitas,
        "dimensiones": producto.dimensiones,
        "material": producto.material,
        "tiempo_entrega": producto.tiempo_entrega,
        "imagenes": obtener_imagenes_producto(producto)
    }


@app.post("/ventas", response_model=VentaResponse)
def crear_venta(venta: VentaCreate, db: Session = Depends(get_db)):
    """Crear orden pendiente de pago"""
    producto = db.query(Producto).filter(Producto.id == venta.producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    numero_orden = generar_numero_orden()
    fecha_compra = datetime.now()

    nueva_venta = VentaRetail(
        cliente_id=generar_cliente_id(),
        numero_orden=numero_orden,
        cliente_final=venta.cliente_final,
        rut_documento=venta.rut_documento,
        email=venta.email,
        telefono=venta.telefono,
        fecha_compra=fecha_compra,
        fecha_entrega=calcular_fecha_entrega(fecha_compra),
        producto=producto.nombre,
        precio=producto.precio_descuento or producto.precio_venta,
        comuna=venta.comuna,
        direccion=venta.direccion,
        region=venta.region,
        sku=producto.sku,
        metodo_pago=venta.metodo_pago,
        estado="nueva",
        estado_pago="pendiente"
    )

    db.add(nueva_venta)
    db.commit()
    db.refresh(nueva_venta)

    return {
        "id": nueva_venta.id,
        "numero_orden": nueva_venta.numero_orden,
        "cliente_final": nueva_venta.cliente_final,
        "producto": nueva_venta.producto,
        "precio": nueva_venta.precio,
        "estado": nueva_venta.estado,
        "estado_pago": nueva_venta.estado_pago,
        "fecha_compra": nueva_venta.fecha_compra
    }

@app.get("/ventas/{numero_orden}", response_model=VentaResponse)
def obtener_venta(numero_orden: str, db: Session = Depends(get_db)):
    """Obtener estado de una orden"""
    venta = db.query(VentaRetail).filter(VentaRetail.numero_orden == numero_orden).first()
    
    if not venta:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    
    return {
        "id": venta.id,
        "numero_orden": venta.numero_orden,
        "cliente_final": venta.cliente_final,
        "producto": venta.producto,
        "precio": venta.precio,
        "estado": venta.estado,
        "estado_pago": venta.estado_pago,
        "fecha_compra": venta.fecha_compra
    }

@app.post("/webpay/iniciar")
async def iniciar_webpay(request: Request, db: Session = Depends(get_db)):
    try:
        body = await request.json()
        numero_orden = body.get("numero_orden")
        monto = int(body.get("monto", 0))

        if not numero_orden or monto <= 0:
            raise HTTPException(status_code=400, detail="Número de orden o monto inválido")

        print(f"🔍 Iniciando transacción para orden: {numero_orden}")
        session_id = f"session_{numero_orden}_{datetime.now().timestamp()}"
        return_url = "http://localhost:3000/webpay/callback"  # Ajusta si estás en prod

        try:
            # Crear transacción en WebPay
            response = transaction.create(
                buy_order=numero_orden,
                session_id=session_id,
                amount=monto,
                return_url=return_url
            )
            
            print(f"✅ Transacción WebPay creada. Token: {response.get('token')}")
            
            # Guardar la transacción en la base de datos
            nueva_transaccion = TransaccionesWebpay(
                numero_orden=numero_orden,
                token=response.get('token'),
                monto=monto,
                estado="iniciada"
                # created_at se asigna automáticamente por la base de datos
            )
            
            db.add(nueva_transaccion)
            db.commit()
            db.refresh(nueva_transaccion)
            
            print(f"✅ Transacción guardada en BD con ID: {nueva_transaccion.id}")
            
            return response
            
        except Exception as e:
            db.rollback()
            error_msg = f"❌ Error creando transacción: {str(e)}"
            print(error_msg)
            raise HTTPException(status_code=500, detail=error_msg)
            
    except Exception as e:
        error_msg = f"❌ Error en iniciar_webpay: {str(e)}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

@app.api_route("/webpay/confirmar", methods=["GET", "POST"])
async def confirmar_webpay(request: Request, db: Session = Depends(get_db)):
    try:
        print("🔍 Iniciando confirmación de pago...")
        
        # Obtener el token de los parámetros de consulta (tanto para GET como POST)
        token_ws = request.query_params.get("token")
        print(f"🔑 Token de la URL: {token_ws}")
        
        # Si no hay token en la URL y es POST, intentar obtenerlo del body
        if not token_ws and request.method == "POST":
            print("📥 Intentando obtener token del body...")
            try:
                form_data = await request.form()
                token_ws = form_data.get("token_ws")
                if token_ws:
                    print(f"🔑 Token_ws del formulario: {token_ws}")
            except Exception as form_error:
                print(f"⚠️ No se pudo obtener el token del formulario: {str(form_error)}")
                # Intentar obtener el token del body como JSON
                try:
                    json_data = await request.json()
                    token_ws = json_data.get("token_ws") or json_data.get("token")
                    if token_ws:
                        print(f"🔑 Token del JSON: {token_ws}")
                except Exception as json_error:
                    print(f"⚠️ No se pudo obtener el token del JSON: {str(json_error)}")

        if not token_ws:
            error_msg = " No se recibió el token_ws en la petición"
            print(error_msg)
            raise HTTPException(status_code=400, detail=error_msg)

        print(f" Buscando transacción con token: {token_ws}")
        transaccion = db.query(TransaccionesWebpay).filter(TransaccionesWebpay.token == token_ws).first()

        if not transaccion:
            error_msg = f" No se encontró transacción con token: {token_ws}"
            print(error_msg)
            raise HTTPException(status_code=404, detail=error_msg)

        print(f" Transacción encontrada - Orden: {transaccion.numero_orden}")

        try:
            # Confirmación simulada
            codigo_autorizacion = f"AUTH{random.randint(100000, 999999)}"
            print(f" Generado código de autorización: {codigo_autorizacion}")
            
            # Actualizar transacción
            transaccion.estado = "completada"
            transaccion.authorization_code = codigo_autorizacion

            # Actualizar ventas asociadas
            print(f" Buscando ventas para la orden: {transaccion.numero_orden}")
            ventas = db.query(VentaRetail).filter(VentaRetail.numero_orden == transaccion.numero_orden).all()
            
            if not ventas:
                print(" No se encontraron ventas asociadas a esta transacción")
            else:
                print(f" Actualizando {len(ventas)} venta(s) asociada(s)")
                
            for venta in ventas:
                venta.estado_pago = "pagada"
                venta.estado = "nueva"
                venta.fecha_pago = datetime.now()
                venta.codigo_autorizacion = codigo_autorizacion

            # Registrar en logs
            log_msg = f" Pago confirmado con código {codigo_autorizacion}"
            print(log_msg)
            db.add(LogsWebpay(
                numero_orden=transaccion.numero_orden,
                token=token_ws,
                tipo="confirmacion",
                mensaje=log_msg
            ))

            db.commit()
            print(" Base de datos actualizada correctamente")

            # Devolver respuesta JSON en lugar de redireccionar
            print(f" Transacción {transaccion.numero_orden} confirmada exitosamente")
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "numero_orden": transaccion.numero_orden,
                    "codigo_autorizacion": codigo_autorizacion,
                    "monto": transaccion.monto,
                    "redirect_url": f"http://localhost:3000/checkout/exito?orden={transaccion.numero_orden}"
                }
            )

        except Exception as db_error:
            db.rollback()
            error_msg = f" Error al actualizar la base de datos: {str(db_error)}"
            print(error_msg)
            return JSONResponse(
                status_code=500,
                content={"error": error_msg}
            )

    except HTTPException as http_error:
        # Re-lanzar las excepciones HTTP
        raise http_error
        
    except Exception as e:
        error_msg = f" Error inesperado en confirmar_webpay: {str(e)}"
        print(error_msg)
        import traceback
        traceback.print_exc()
        # Devolver error como JSON
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": error_msg,
                "redirect_url": f"http://localhost:3000/checkout/error?mensaje={error_msg}"
            }
        )

@app.get("/webpay/formulario")
def formulario_webpay(token: str):
    """Página simulada de Webpay para desarrollo"""
    return {
        "mensaje": "Simulador de Webpay - En producción esto sería el formulario real",
        "token": token,
        "instrucciones": f"Para simular pago exitoso, llama a POST /webpay/confirmar con token={token}"
    }

# Endpoint de salud
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API JHK Muebles funcionando"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)