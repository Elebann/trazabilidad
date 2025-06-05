from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
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

class Rol(models.Model):
    rol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.rol

# Constructor model for Usuario. this will make you log in /admin with rut and password instead username and password
class UsuarioManager(BaseUserManager):
    def create_user(self, rut, nombre, password=None, **extra_fields):
        if not rut:
            raise ValueError('El usuario debe tener un RUT')
        user = self.model(rut=rut, nombre=nombre, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, rut, nombre, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True')

        # set the highest role in the project, if there is no role, do it
        try:
            rol_admin = Rol.objects.get(rol='Administrador')
        except Rol.DoesNotExist:
            rol_admin = Rol.objects.create(rol='Administrador')

        extra_fields['rol'] = rol_admin

        return self.create_user(rut, nombre, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    rut = models.IntegerField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=50)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    """
    JWT search for and ID field by default, but we are using rut as our primary key.
    This code below is a way to say that rut is our "id". so we can use it in JWT without changing how it works.
    """
    @property
    def id(self):
        return self.rut

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    # this is the way to say that we are using our own manager
    objects = UsuarioManager()
    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
        return f"{self.rut} - {self.nombre}"

class Material(models.Model):
    fecha_ingreso = models.DateField()
    nombre = models.CharField(max_length=50)
    comentarios = models.TextField(blank=True, null=True, max_length=200)
    estado = models.ForeignKey(EstadoMaterial, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoMaterial, on_delete=models.CASCADE)
    agregado_por = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
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

# todo URGENTE, un Folio puede tener varios materiales, pero un material solo puede estar en un folio a la vez. hacer la relación 1:N.
class Folio(models.Model):
    fechahora_ingreso = models.DateTimeField()
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Folio #{self.id}"