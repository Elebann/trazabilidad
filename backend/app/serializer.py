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

class PrestacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestacion
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

class NumCargaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumCarga
        fields = '__all__'

class AutoclaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autoclave
        fields = '__all__'

# ------------------------------------------------------------

class UsuarioSerializer(serializers.ModelSerializer):
    id_Rol = RolSerializer(read_only=True)

    class Meta:
        model = Usuario
        fields = 'rut', 'nombre', 'id_Rol'

class MaterialSerializer(serializers.ModelSerializer):
    tipo = TipoMaterialSerializer(read_only=True)
    estado = EstadoMaterialSerializer(read_only=True)
    metodo_esterilizacion = MetodoEsterilizacionSerializer(read_only=True)
    tipo_control = TipoControlMaterialSerializer(read_only=True)

    class Meta:
        model = Material
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    estado = EstadoClienteSerializer(read_only=True)
    prestacion = PrestacionSerializer(read_only=True)

    class Meta:
        model = Cliente
        fields = '__all__'

class FolioSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    usuario = UsuarioSerializer(read_only=True)
    material = MaterialSerializer(read_only=True)

    class Meta:
        model = Folio
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom data to the token
        token['user_id'] = user.rut
        token['rol'] = user.rol.rol # this is important because rol is the key for hiding the menu
        token['nombre'] = user.nombre
        return token

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])
        data = { 'access': str(refresh.access_token) }

        if 'refresh' in attrs:
            data['refresh'] = attrs['refresh']
        return data