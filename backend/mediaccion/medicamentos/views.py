from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Medicamentos
from .serializers import ProfileUserSerializer, NotificacionesSerializer, RecetasMedicasSerializer, AlimentosSerializer, MedicamentosSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

#Solo permitimos a no usuarios registrados crearse la cuenta
@api_view(['POST'])
@permission_classes([AllowAny])
def CrearUser(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuario creado"}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

#CRUD Usuarios    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def UserCrud(request, pk=None):
    if request.method == 'GET':
        if not pk:
            perfiles = ProfileUser.objects.select_related('user').all()
            serializer = ProfileUserSerializer(perfiles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                perfil = ProfileUser.objects.select_related('user').get(id=pk)
            except ProfileUser.DoesNotExist:
                return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
            serializer = ProfileUserSerializer(perfil)
            return Response(serializer.data)    

    if not pk:
        return Response({'error': 'Se necesita ID'}, status=status.HTTP_400_BAD_REQUEST)
            
    if request.method == 'PUT':
        try:
            perfil = ProfileUser.objects.get(id=pk)
        except ProfileUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProfileUserSerializer(perfil, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario actualizado"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)    

    if request.method == 'DELETE':
        try:
            user = ProfileUser.objects.get(id=pk)
        except ProfileUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response({"message": "Usuario eliminado"}, status=status.HTTP_200_OK)
        
# CRUD Notificaciones
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def NotificacionesView(request, pk=None):
    if request.method == 'GET':
        if not pk:
            notificaciones = Notificaciones.objects.all()
            serializer = NotificacionesSerializer(notificaciones, many=True)
            return Response(serializer.data)
        else:
            try:
                notificaciones = Notificaciones.objects.get(id=pk)
            except ProfileUser.DoesNotExist:
                return Response({"error": "Notificacion no encontrada"}, status=status.HTTP_404_NOT_FOUND)
            serializer = NotificacionesSerializer(notificaciones)
            return Response(serializer.data)
            
    if request.method == 'POST':
        serializer = NotificacionesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Notificacion creada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        #return Response(serializer.data)

    if not pk:
        return Response({'error': 'Se necesita ID'}, status=status.HTTP_400_BAD_REQUEST)
               
    if request.method == 'PUT':
        try:
            notificacion = Notificaciones.objects.get(id=pk)
        except Notificaciones.DoesNotExist:
            return Response({"error": "Notificacion no encontrada"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = NotificacionesSerializer(notificacion, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Notificacion actualizada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            notificacion = Notificaciones.objects.get(id=pk)
        except Notificaciones.DoesNotExist:
            return Response({"error": "Notificacion no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        notificacion.delete()
        return Response({"message": "Notificacion eliminada"}, status=status.HTTP_204_NO_CONTENT)

#CRUD Recetas Medicas
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def RecetasMedicasView(request, pk=None):
    if request.method == 'GET':
        if not pk:
            recetas = RecetasMedicas.objects.all()
            serializer = RecetasMedicasSerializer(recetas, many=True)
            return Response(serializer.data)
        else:
            try:
                recetas = RecetasMedicas.objects.get(id=pk)
            except RecetasMedicas.DoesNotExist:
                return Response({"error": "Receta medica no encontrada"}, status=status.HTTP_404_NOT_FOUND)
            serializer = RecetasMedicasSerializer(recetas)
            return Response(serializer.data)
            
    if request.method == 'POST':
        serializer = RecetasMedicasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Receta medica creada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if not pk:
        return Response({'error': 'Se necesita ID'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        try:
            recetas = RecetasMedicas.objects.get(id=pk)
        except RecetasMedicas.DoesNotExist:
            return Response({"error": "Recetas medica no encontrada"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecetasMedicasSerializer(recetas, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Receta medica actualizada"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            recetas = RecetasMedicas.objects.get(id=pk)
        except RecetasMedicas.DoesNotExist:
            return Response({"error": "Receta medica no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        recetas.delete()
        return Response({"message": "Receta medica eliminada"}, status=status.HTTP_204_NO_CONTENT)

#CRUD Alimentos
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def AlimentosView(request, pk=None):
    if request.method == 'GET':
        if not pk:
            alimentos = Alimentos.objects.all()
            serializer = AlimentosSerializer(alimentos, many=True)
            return Response(serializer.data)
        else:
            try:
                alimentos = Alimentos.objects.get(id=pk)
            except Alimentos.DoesNotExist:
                return Response({"error": "Alimento no encontrado"}, status=status.HTTP_404_NOT_FOUND)
            serializer = AlimentosSerializer(alimentos)
            return Response(serializer.data)

    if request.method == 'POST':
        serializer = AlimentosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Alimento creado"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if not pk:
        return Response({'error': 'Se necesita ID'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        try:
            alimentos = Alimentos.objects.get(id=pk)
        except Alimentos.DoesNotExist:
            return Response({"error": "Alimento no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AlimentosSerializer(alimentos, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Alimento actualizado"}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            alimentos = Alimentos.objects.get(id=pk)
        except Alimentos.DoesNotExist:
            return Response({"error": "Alimento no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        alimentos.delete()
        return Response({"message": "Alimento eliminado"}, status=status.HTTP_204_NO_CONTENT)

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