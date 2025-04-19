from django.db import models

# Create your models here.

# Models without relationships
class TipoControlMaterial(models.Model):
    tipo_control_material = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.tipo_control_material

class TipoMaterial(models.Model):
    tipo_material = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.tipo_material

class MetodoEsterilizacion(models.Model):
    metodo = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.metodo

class EstadoMaterial(models.Model):
    estado = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.estado

# Models with relationships
class Material(models.Model):
    fecha_ingreso = models.DateField()
    nombre = models.CharField(max_length=50)
    estado = models.ForeignKey(EstadoMaterial, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoMaterial, on_delete=models.CASCADE)
    metodo_esterilizacion = models.ForeignKey(MetodoEsterilizacion, on_delete=models.CASCADE)
    tipo_control = models.ForeignKey(TipoControlMaterial, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre}"

class NumCarga(models.Model):
    fechahora = models.DateTimeField()
    material = models.ForeignKey(Material, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.fechahora} - {self.material.nombre}"

class Autoclave(models.Model):
    carga = models.ForeignKey(NumCarga, on_delete=models.CASCADE)

    def __str__(self):
        return f"Autoclave {self.carga.fechahora} - {self.carga.material.nombre}"

class Rol(models.Model):
    rol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.rol

class Usuario(models.Model):
    rut = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)
    id_Rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.rut} - {self.nombre}"

class HistorialModificacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    fecha_modificacion = models.DateTimeField()

    def __str__(self):
        return f"{self.usuario.nombre} - {self.material.nombre} - {self.fecha_modificacion}"

class Prestacion(models.Model):
    prestacion = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.prestacion

class EstadoCliente(models.Model):
    estado = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.estado

class Cliente(models.Model):
    nombre = models.CharField(max_length=50)
    estado = models.ForeignKey(EstadoCliente, on_delete=models.CASCADE)
    prestacion = models.ForeignKey(Prestacion, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Folio(models.Model):
    fechahora_ingreso = models.DateTimeField()
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Folio #{self.id}"