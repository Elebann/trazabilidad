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
    Prestacion,
    Rol,
    TipoControlMaterial,
    TipoMaterial,
    Usuario,
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
    Prestacion,
    Rol,
    TipoControlMaterial,
    TipoMaterial,
    Usuario,
])