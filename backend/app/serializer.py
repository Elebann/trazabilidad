# Serializer permite convertir los modelos a JSON mediante el paquete DRF
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class TipoMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoMaterial
        fields = '__all__'

class EstadoMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoMaterial
        fields = '__all__'

class MetodoEsterilizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoEsterilizacion
        fields = '__all__'

class TipoControlMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoControlMaterial
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class EstadoClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCliente
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class HistorialModificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialModificacion
        fields = '__all__'

class AutoclaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autoclave
        fields = '__all__'

class TipoIngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIngreso
        fields = '__all__'

# ------------------------------------------------------------

class UsuarioSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    password = serializers.CharField(write_only=True, required=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all(),
        write_only=True,
        source='rol'
    )

    class Meta:
        model = Usuario
        fields = ['rut', 'nombre', 'rol', 'rol_id', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        usuario = Usuario(**validated_data)
        if password:
            usuario.set_password(password)
        usuario.save()
        return usuario


class ClienteSerializer(serializers.ModelSerializer):
    estado = EstadoClienteSerializer(read_only=True)

    class Meta:
        model = Cliente
        fields = '__all__'

class FolioSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    ingresado = UsuarioSerializer(read_only=True)
    recepcionado = UsuarioSerializer(read_only=True, required=False)
    servicio = ServicioSerializer(read_only=True)
    
    # Campos de escritura para relaciones foráneas
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(),
        source='cliente',
        write_only=True
    )
    ingresado_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='ingresado',
        write_only=True
    )
    recepcionado_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='recepcionado',
        write_only=True,
        required=False
    )
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset=Servicio.objects.all(),
        source='servicio',
        write_only=True,
        required=False
    )

    class Meta:
        model = Folio
        fields = '__all__'


class LotePreparacionInfoSerializer(serializers.ModelSerializer):
    """Serializer reducido para incluir el lote asignado al material preparado"""
    class Meta:
        model = LotePreparacion
        fields = ['id', 'codigo', 'fecha_preparacion']

class MaterialSerializer(serializers.ModelSerializer):
    tipo = TipoMaterialSerializer(read_only=True)
    estado = EstadoMaterialSerializer(read_only=True)
    metodo_esterilizacion = MetodoEsterilizacionSerializer(read_only=True)
    agregado_por = UsuarioSerializer(read_only=True)
    tipo_control = TipoControlMaterialSerializer(read_only=True)
    tipo_ingreso = TipoIngresoSerializer(read_only=True)
    folio = FolioSerializer(read_only=True, required=False)
    ultimo_lote = serializers.SerializerMethodField()

    # Campos de escritura para relaciones foráneas
    tipo_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoMaterial.objects.all(),
        source='tipo',
        write_only=True
    )
    estado_id = serializers.PrimaryKeyRelatedField(
        queryset=EstadoMaterial.objects.all(),
        source='estado',
        write_only=True
    )
    metodo_esterilizacion_id = serializers.PrimaryKeyRelatedField(
        queryset=MetodoEsterilizacion.objects.all(),
        source='metodo_esterilizacion',
        write_only=True
    )
    agregado_por_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='agregado_por',
        write_only=True
    )
    # tipo_control_id = serializers.PrimaryKeyRelatedField(
    #     queryset=TipoControlMaterial.objects.all(),
    #     source='tipo_control',
    #     write_only=True
    # )
    tipo_ingreso_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoIngreso.objects.all(),
        source='tipo_ingreso',
        write_only=True
    )
    folio_id = serializers.PrimaryKeyRelatedField(
        queryset=Folio.objects.all(),
        source='folio',
        write_only=True,
        required=False
    )

    class Meta:
        model = Material
        fields = '__all__'
        
    def get_ultimo_lote(self, obj):
        try:
            lote = obj.lotes_preparacion.order_by('-fecha_preparacion').first()
            if lote:
                return LotePreparacionInfoSerializer(lote).data
            return None
        except:
            return None

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom data to the token
        token['user_id'] = user.rut
        token['rol'] = user.rol.rol
        token['rol_id'] = user.rol.id # this is important because rol is the key for hiding the menu
        token['nombre'] = user.nombre
        return token

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])
        data = { 'access': str(refresh.access_token) }

        if 'refresh' in attrs:
            data['refresh'] = attrs['refresh']
        return data

class LotePreparacionSerializer(serializers.ModelSerializer):
    preparado_por = UsuarioSerializer(read_only=True)
    preparado_por_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='preparado_por',
        write_only=True
    )
    materiales_ids = serializers.PrimaryKeyRelatedField(
        queryset=Material.objects.all(),
        many=True,
        write_only=True,
        source='materiales'
    )
    materiales = MaterialSerializer(many=True, read_only=True)

    class Meta:
        model = LotePreparacion
        fields = ['id', 'fecha_preparacion', 'codigo', 'preparado_por', 'preparado_por_id',
                 'control_biologico', 'control_priones', 'materiales', 'materiales_ids']

class NumCargaSerializer(serializers.ModelSerializer):
    materiales = LotePreparacionSerializer(read_only=True)
    materiales_id = serializers.PrimaryKeyRelatedField(
        queryset=LotePreparacion.objects.all(),
        source='materiales',
        write_only=True,
        required=False
    )

    class Meta:
        model = NumCarga
        fields = ['id', 'fechahora', 'materiales', 'materiales_id', 'finished']