from django.contrib import admin
from .models import (
    Autoclave,
    Cliente,
    EstadoCliente,
    EstadoMaterial,
    Folio,
    HistorialModificacion,
    Material,
    MetodoEsterilizacion,
    NumCarga,
    Servicio,
    Rol,
    TipoControlMaterial,
    TipoMaterial,
    Usuario, TipoIngreso,
    LotePreparacion
)

# Register your models here.
admin.site.register([
    Autoclave,
    Cliente,
    EstadoCliente,
    EstadoMaterial,
    Folio,
    HistorialModificacion,
    Material,
    MetodoEsterilizacion,
    NumCarga,
    Servicio,
    Rol,
    TipoControlMaterial,
    TipoMaterial,
    Usuario,
    TipoIngreso,
    LotePreparacion,
])