from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializer import *

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

class PrestacionViewSet(viewsets.ModelViewSet):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer

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

# ------------------------------------------------------------

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FolioViewSet(viewsets.ModelViewSet):
    queryset = Folio.objects.all()
    serializer_class = FolioSerializer