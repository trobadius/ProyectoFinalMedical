from rest_framework import serializers
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Medicamentos
from django.contrib.auth.models import User
#Se tiene que añadir revisar para cuando este hecho el front
#from rest_framework.permissions import IsAuthenticated, AllowAny

#Serializer ProfileUser y campos User en una sola
class ProfileUserSerializer(serializers.ModelSerializer):
    id_user = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = ProfileUser
        fields = ['id_user', 'username', 'id', 'edad', 'roles', 'genero']

#Serializer anidado
class ProfileRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileUser
        exclude = ['user']  

class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileRegisterSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'profile']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        ProfileUser.objects.create(user=user, **profile_data)
        return user

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


class MedicamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamentos
        fields = '__all__'