from django.urls import path, include
from rest_framework import routers
from app import views

router = routers.DefaultRouter()

# Registro de cada ViewSet
router.register(r'tipo-material', views.TipoMaterialViewSet)
router.register(r'estado-material', views.EstadoMaterialViewSet)
router.register(r'metodo-esterilizacion', views.MetodoEsterilizacionViewSet)
router.register(r'tipo-control-material', views.TipoControlMaterialViewSet)
router.register(r'prestacion', views.PrestacionViewSet)
router.register(r'estado-cliente', views.EstadoClienteViewSet)
router.register(r'rol', views.RolViewSet)
router.register(r'usuario', views.UsuarioViewSet)
router.register(r'material', views.MaterialViewSet)
router.register(r'cliente', views.ClienteViewSet)
router.register(r'folio', views.FolioViewSet)
router.register(r'num-carga', views.NumCargaViewSet)
router.register(r'autoclave', views.AutoclaveViewSet)
router.register(r'historial-modificacion', views.HistorialModificacionViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]

# Todo lo anterior esta generando GET, POST, PUT, DELETE