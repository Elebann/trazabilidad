from django.urls import path, include
from rest_framework import routers
from app import views

router = routers.DefaultRouter()

# Registro de cada ViewSet
router.register(r'tipo-material', views.TipoMaterialViewSet)
router.register(r'estado-material', views.EstadoMaterialViewSet)
router.register(r'metodo-esterilizacion', views.MetodoEsterilizacionViewSet)
router.register(r'tipo-control-material', views.TipoControlMaterialViewSet)
router.register(r'servicio', views.ServicioViewSet)
router.register(r'estado-cliente', views.EstadoClienteViewSet)
router.register(r'rol', views.RolViewSet)
router.register(r'usuario', views.UsuarioViewSet)
router.register(r'material', views.MaterialViewSet)
router.register(r'cliente', views.ClienteViewSet)
router.register(r'folio', views.FolioViewSet)
router.register(r'num-carga', views.NumCargaViewSet)
router.register(r'autoclave', views.AutoclaveViewSet)
router.register(r'historial-modificacion', views.HistorialModificacionViewSet)
router.register(r'tipo-ingreso', views.TipoIngresoViewSet)
router.register(r'lote-preparacion', views.LotePreparacionViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/folio/crear-con-materiales/', views.FolioViewSet.as_view({'post': 'crear_con_materiales'}), name='crear-folio-con-materiales'),
    path('api/v1/lote-preparacion/crear-lote-preparacion/', 
         views.LotePreparacionViewSet.as_view({'post': 'crear_lote_preparacion'}), 
         name='crear-lote-preparacion'),
]