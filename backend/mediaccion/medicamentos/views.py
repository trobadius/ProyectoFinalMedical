from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Medicamentos
from .serializers import ProfileUserSerializer, NotificacionesSerializer, RecetasMedicasSerializer, AlimentosSerializer, MedicamentosSerializer, RegisterSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

#Solo permitimos a no usuarios registrados crearse la cuenta
#CRUD Usuarios  
@api_view(['POST'])
@permission_classes([AllowAny])
def CrearUser(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuario creado"}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UsersViews(request):
    if request.method == 'GET':
        perfiles = ProfileUser.objects.select_related('user').all()
        serializer = ProfileUserSerializer(perfiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def ProfileView(request):
    user = request.user
    print(user)
    #Validaciones buenas practicas
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProfileUserSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        serializer = ProfileUserSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario actualizado"}, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    #Al estar autenticado con JWT sigue existiendo el token pero al intentar acceder dara un 401
    if request.method == 'DELETE':
        user.delete()
        return Response({"message": "Usuario eliminado"}, status=status.HTTP_204_NO_CONTENT)
        
# CRUD Notificaciones
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def NotificacionesView(request):
    user = request.user
    #Validaciones buenas practicas
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)
    #Obtiene todas las notificaciones del usuario
    try:
        notificaciones = Notificaciones.objects.filter(profile=profile)
    except Notificaciones.DoesNotExist:
        return Response({"error": "Notificación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    #el profile=profile hace que asigne este profile si o si si tiene el campo user obligatorio
    if request.method == 'GET':
        serializer = NotificacionesSerializer(notificaciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = NotificacionesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response({"message": "Notificación creada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def NotificacionesDetailView(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)

    try:
        notificaciones = Notificaciones.objects.get(pk=pk, profile=profile)
    except Notificaciones.DoesNotExist:
        return Response({"error": "Notificación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = NotificacionesSerializer(notificaciones)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = NotificacionesSerializer(notificaciones, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        notificaciones.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#CRUD Recetas Medicas
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def RecetasMedicasView(request):
    user = request.user
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)
    #Obtiene todas las recetas del usuario
    try:
        recetas = RecetasMedicas.objects.filter(profile=profile)
    except RecetasMedicas.DoesNotExist:
        return Response({"error": "Recetas no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RecetasMedicasSerializer(recetas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = RecetasMedicasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response({"message": "Receta medica creada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def RecetasMedicasDetailView(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)

    try:
        receta = RecetasMedicas.objects.get(pk=pk, profile=profile)
    except RecetasMedicas.DoesNotExist:
        return Response({"error": "Receta no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RecetasMedicasSerializer(receta)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = RecetasMedicasSerializer(receta, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        receta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#CRUD Alimentos
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def AlimentosView(request):
    user = request.user
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)
    #Obtiene todos los alimnentos del usuario
    try:
        alimentos = Alimentos.objects.filter(profile=profile)
    except Alimentos.DoesNotExist:
        return Response({"error": "Alimentos no encontrados"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AlimentosSerializer(alimentos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = AlimentosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response({"message": "Alimento creada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def AlimentosDetailView(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        profile = user.profile
    except ProfileUser.DoesNotExist:
        return Response({"error": "El perfil no existe"}, status=status.HTTP_404_NOT_FOUND)

    try:
        alimentos = Alimentos.objects.get(pk=pk, profile=profile)
    except Alimentos.DoesNotExist:
        return Response({"error": "Alimento no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AlimentosSerializer(alimentos)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = AlimentosSerializer(alimentos, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        alimentos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#CRUD Medicamentos
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def MedicamentosView(request, pk=None):
    if request.method == 'GET':
        if not pk:
            medicamentos = Medicamentos.objects.select_related('alimento').all()
            serializer = MedicamentosSerializer(medicamentos, many=True)
            return Response(serializer.data)
        else:
            try:
                medicamentos = Medicamentos.objects.select_related('alimento').get(id=pk)
            except Medicamentos.DoesNotExist:
                return Response({"error": "Medicamento no encontrado"}, status=status.HTTP_404_NOT_FOUND)
            serializer = MedicamentosSerializer(medicamentos)
            return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicamentosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Medicamento creado"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if not pk:
        return Response({'error': 'Se necesita ID'}, status=status.HTTP_400_BAD_REQUEST)
  
    if request.method == 'PUT':
        try:
            medicamentos = Medicamentos.objects.get(id=pk)
        except Medicamentos.DoesNotExist:
            return Response({"error": "Medicamento no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MedicamentosSerializer(medicamentos, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Medicamento actualizado"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            medicamentos = Medicamentos.objects.get(id=pk)
        except Medicamentos.DoesNotExist:
            return Response({"error": "Medicamento no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        medicamentos.delete()
        return Response({"message": "Medicamento eliminado"}, status=status.HTTP_204_NO_CONTENT)