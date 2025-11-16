from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ProfileUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='user')
    edad = models.DateField(null=True, blank=True)
    es_principal = models.BooleanField
    ROLES = [
        ("admin", "Administrador"),
        ("user", "Ususario"),
        ("usuario_secundario", "Usuario Secundario"),
    ]
    roles = models.CharField(max_length=20, choices=ROLES, default='user')

    GENEROS = [
        ('hombre', 'Hombre'),
        ('mujer', 'Mujer'),
        ('no_decir', 'Prefiero no decirlo')
    ]
    genero = models.CharField(max_length=20, choices=GENEROS, default='no_decir')

    def __str__(self):
        return self.user.username

class Notificaciones(models.Model):
    notificacion = models.CharField(max_length=50)
    user = models.ForeignKey(ProfileUser, on_delete=models.CASCADE, null=True, blank=True, related_name='notificaciones')

    def __str__(self):
        return self.notificacion

class RecetasMedicas(models.Model):
    recetas_medicas = models.CharField(max_length=100)
    user = models.ForeignKey(ProfileUser, on_delete=models.CASCADE, null=True, blank=True, related_name = 'recetasmedicas')

    def __str__(self):
        return self.recetas_medicas

class Alimentos(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Medicamentos(models.Model):
    nombre_medicamento = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    f_caducidad = models.DateField(null=True, blank=True)
    alimento = models.ForeignKey(Alimentos, on_delete=models.CASCADE, null=True, blank=True, related_name='medicamentos')

    def __str__(self):
        return self.nombre_medicamento