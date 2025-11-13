from rest_framework import serializers
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Usuarios, Medicamentos

class ProfileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileUser
        fields = '__all__'  # muestra todos los campos del modelo


class NotificacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificaciones
        fields = '__all__'


class RecetasMedicasSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecetasMedicas
        fields = '__all__'


class AlimentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimentos
        fields = '__all__'


class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'


class MedicamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamentos
        fields = '__all__'