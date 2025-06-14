from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.db import models

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
        return f"ID {self.id} - {self.estado}"

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

class TipoIngreso(models.Model):
    tipo_ingreso = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"#{self.id} {self.tipo_ingreso}"

class Servicio(models.Model):
    servicio = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.servicio

class EstadoCliente(models.Model):
    estado = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.estado

class Cliente(models.Model):
    nombre = models.CharField(max_length=50)
    estado = models.ForeignKey(EstadoCliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} - Estado: {self.estado}"

class Folio(models.Model):
    fechahora_ingreso = models.DateTimeField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    ingresado = models.ForeignKey(Usuario, on_delete=models.CASCADE) # Quién ingresó el folio
    recepcionado = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='recepcionista', null=True, blank=True) # Quién va fisicamente a recibir las cosas
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, null=True, blank=True)
    nfolio = models.IntegerField(unique=True, null=True, blank=True) # Número del folio, es diferente al id de la base de datos

    def __str__(self):
        return f"#{self.id} Folio - Número: {self.nfolio}"

class Material(models.Model):
    fecha_ingreso = models.DateField()
    nombre = models.CharField(max_length=50)
    comentarios = models.TextField(blank=True, null=True, max_length=200)
    cantidad = models.IntegerField(default=1, blank=True, null=True)
    estado = models.ForeignKey(EstadoMaterial, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoMaterial, on_delete=models.CASCADE)
    agregado_por = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    metodo_esterilizacion = models.ForeignKey(MetodoEsterilizacion, on_delete=models.CASCADE)
    # tipo_control = models.ForeignKey(TipoControlMaterial, on_delete=models.CASCADE)
    control_biologico = models.BooleanField(default=False)
    control_priones = models.BooleanField(default=False)
    tipo_ingreso = models.ForeignKey(TipoIngreso, on_delete=models.CASCADE, null=True, blank=True)
    folio = models.ForeignKey(Folio, on_delete=models.CASCADE, null=True, blank=True)
    # todo agregar las columnas que corresponden al material externo

    def __str__(self):
        return f"{self.nombre} ({self.tipo_ingreso})"

# Nuevo modelo para agrupar materiales preparados
class LotePreparacion(models.Model):
    fecha_preparacion = models.DateTimeField(auto_now_add=True)
    preparado_por = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=50, unique=True)
    control_biologico = models.BooleanField(default=False)
    control_priones = models.BooleanField(default=False)
    materiales = models.ManyToManyField(Material, related_name='lotes_preparacion')

    def __str__(self):
        return f"Lote #{self.id} - {self.codigo}"

class HistorialModificacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    fecha_modificacion = models.DateTimeField()

    def __str__(self):
        return f"{self.usuario.nombre} - {self.material.nombre} - {self.fecha_modificacion}"

class NumCarga(models.Model):
    fechahora = models.DateTimeField()
    # se cambió la relación a LotePreparacion para que involucre todos los materiales preparados que irán al autoclave
    materiales = models.ForeignKey(LotePreparacion, on_delete=models.CASCADE, null=True, blank=True)
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.fechahora} - {self.materiales.codigo}"

class Autoclave(models.Model):
    carga = models.ForeignKey(NumCarga, on_delete=models.CASCADE)

    def __str__(self):
        return f"Autoclave {self.carga.fechahora}"