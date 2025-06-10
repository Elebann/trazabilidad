from datetime import datetime
import uuid
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import *
from .models import *
from django.utils import timezone

class TipoMaterialViewSet(viewsets.ModelViewSet):
    queryset = TipoMaterial.objects.all()
    serializer_class = TipoMaterialSerializer

class EstadoMaterialViewSet(viewsets.ModelViewSet):
    queryset = EstadoMaterial.objects.all()
    serializer_class = EstadoMaterialSerializer

class MetodoEsterilizacionViewSet(viewsets.ModelViewSet):
    queryset = MetodoEsterilizacion.objects.all()
    serializer_class = MetodoEsterilizacionSerializer

class TipoControlMaterialViewSet(viewsets.ModelViewSet):
    queryset = TipoControlMaterial.objects.all()
    serializer_class = TipoControlMaterialSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class EstadoClienteViewSet(viewsets.ModelViewSet):
    queryset = EstadoCliente.objects.all()
    serializer_class = EstadoClienteSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class NumCargaViewSet(viewsets.ModelViewSet):
    queryset = NumCarga.objects.all()
    serializer_class = NumCargaSerializer

class AutoclaveViewSet(viewsets.ModelViewSet):
    queryset = Autoclave.objects.all()
    serializer_class = AutoclaveSerializer

class HistorialModificacionViewSet(viewsets.ModelViewSet):
    queryset = HistorialModificacion.objects.all()
    serializer_class = HistorialModificacionSerializer

class TipoIngresoViewSet(viewsets.ModelViewSet):
    queryset = TipoIngreso.objects.all()
    serializer_class = TipoIngresoSerializer
# ------------------------------------------------------------

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['folio', 'tipo_ingreso', 'estado']

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FolioViewSet(viewsets.ModelViewSet):
    queryset = Folio.objects.all()
    serializer_class = FolioSerializer
    
    @action(detail=False, methods=['post'])
    def crear_con_materiales(self, request):
        """
        Crea un folio con múltiples materiales en una sola operación
        """
        # Obtener datos del folio y materiales
        folio_data = request.data.get('folio', {})
        materiales_data = request.data.get('materiales', [])
        
        if not folio_data or not materiales_data:
            return Response(
                {'error': 'Datos incompletos. Se requiere información del folio y al menos un material.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Asegurarse de que fechahora_ingreso esté presente
        if 'fechahora_ingreso' not in folio_data:
            folio_data['fechahora_ingreso'] = timezone.now().isoformat()
            
        # Crear el folio
        folio_serializer = FolioSerializer(data=folio_data)
        if not folio_serializer.is_valid():
            return Response(folio_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        folio = folio_serializer.save()
        
        # Crear los materiales asociados al folio
        materiales_creados = []
        for material_data in materiales_data:
            material_data['folio'] = folio.id
            material_data['fecha_ingreso'] = material_data.get('fecha_ingreso', datetime.now().date().isoformat())
            
            material_serializer = MaterialSerializer(data=material_data)
            if material_serializer.is_valid():
                material_serializer.save()
                materiales_creados.append(material_serializer.data)
            else:
                # Si hay error en un material, revertir todo eliminando el folio (cascada)
                folio.delete()
                return Response(
                    {'error': 'Error al crear material', 'detalles': material_serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Retornar respuesta con folio y materiales creados
        return Response({
            'folio': folio_serializer.data,
            'materiales': materiales_creados
        }, status=status.HTTP_201_CREATED)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer

class LotePreparacionViewSet(viewsets.ModelViewSet):
    queryset = LotePreparacion.objects.all()
    serializer_class = LotePreparacionSerializer

    @action(detail=False, methods=['post'], url_path='crear-lote-preparacion')
    def crear_lote_preparacion(self, request):
        """
        Crea un lote de preparación y actualiza el estado de los materiales a 'Preparado'
        """
        try:
            with transaction.atomic():
                # Obtener datos del request
                materiales_ids = request.data.get('materiales_ids', [])
                control_biologico = request.data.get('control_biologico', False)
                control_priones = request.data.get('control_priones', False)
                preparado_por_id = request.data.get('preparado_por_id')
                
                print(f"Datos recibidos: {request.data}")

                if not materiales_ids or not preparado_por_id:
                    return Response(
                        {'error': 'Se requieren materiales y usuario responsable'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Generar código único para el lote con el formato PREP-(code) 4 dígitos
                codigo = f"PREP-{uuid.uuid4().hex[:4].upper()}"

                # Crear el lote
                lote_data = {
                    'codigo': codigo,
                    'preparado_por_id': preparado_por_id,
                    'control_biologico': control_biologico,
                    'control_priones': control_priones,
                    'materiales_ids': materiales_ids
                }

                serializer = LotePreparacionSerializer(data=lote_data)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                lote = serializer.save()

                # Buscar el estado "Preparado"
                try:
                    estado_preparado = EstadoMaterial.objects.get(estado='Preparado')
                except EstadoMaterial.DoesNotExist:
                    estado_preparado = EstadoMaterial.objects.create(estado='Preparado')

                # Actualizar el estado de todos los materiales a "Preparado"
                # Actualizar los controles biológicos y de priones
                Material.objects.filter(id__in=materiales_ids).update(
                    estado=estado_preparado,
                    control_biologico=control_biologico,
                    control_priones=control_priones
                )

                # Obtener el lote actualizado con sus materiales
                lote_actualizado = LotePreparacion.objects.get(id=lote.id)
                result = LotePreparacionSerializer(lote_actualizado).data

                return Response(result, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)