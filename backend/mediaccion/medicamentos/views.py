from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Usuarios, Medicamentos
from .serializers import ProfileUserSerializer, NotificacionesSerializer, RecetasMedicasSerializer, AlimentosSerializer, UsuariosSerializer, MedicamentosSerializer

# Create your views here.


# class ProfileUserViewSet(viewsets.ModelViewSet):
#     queryset = ProfileUser.objects.all()
#     serializer_class = ProfileUserSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ProfileUserView(request, pk=None):
    if request.method == 'GET':
        users = ProfileUser.objects.all()
        serializer = ProfileUserSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProfileUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(ProfileUser, pk = pk)
        
        if request.method == 'PUT':
            serializer = ProfileuserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# class NotificacionesViewSet(viewsets.ModelViewSet):
#     queryset = Notificaciones.objects.all()
#     serializer_class = NotificacionesSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def NotificacionesView(request, pk=None):
    if request.method == 'GET':
        notificaciones = Notificaciones.objects.all()
        serializer = NotificacionesSerializer(notificaciones, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = NotificacionesSerializer(notificaciones, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(notificaciones, pk = pk)
        
        if request.method == 'PUT':
            serializer = NotificacionesSerializer(notificaciones, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            Notificaciones.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# class RecetasMedicasViewSet(viewsets.ModelViewSet):
#     queryset = RecetasMedicas.objects.all()
#     serializer_class = RecetasMedicasSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def RecetasMedicasView(request, pk=None):
    if request.method == 'GET':
        recetas = RecetasMedicas.objects.all()
        serializer = RecetasMedicasSerializer(recetas, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = RecetasMedicasSerializer(recetas, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(recetas, pk = pk)
        
        if request.method == 'PUT':
            serializer = RecetasMedicasSerializer(recetas, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            RecetasMedicas.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# class AlimentosViewSet(viewsets.ModelViewSet):
#     queryset = Alimentos.objects.all()
#     serializer_class = AlimentosSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def AlimentosView(request, pk=None):
    if request.method == 'GET':
        alimentos = Alimentos.objects.all()
        serializer = AlimentosSerializer(alimentos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AlimentosSerializer(alimentos, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(alimentos, pk = pk)
        
        if request.method == 'PUT':
            serializer = AlimentosSerializer(alimentos, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            Alimentos.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# class UsuariosViewSet(viewsets.ModelUsuarios):
#     queryset = Usuarios.objects.all()
#     serializer_class = UsuariosSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def UsuariosView(request, pk=None):
    if request.method == 'GET':
        usuarios = Usuarios.objects.all()
        serializer = UsuariosSerializer(usuarios, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UsuariosSerializer(usuarios, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(usuarios, pk = pk)
        
        if request.method == 'PUT':
            serializer = UsuariosSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# class MedicamentosViewSet(viewsets.ModelMedicamentos):
#     queryset = Medicamentos.objects.all()
#     serializer_class = MedicamentosSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def MedicamentosView(request, pk=None):
    if request.method == 'GET':
        meidcamentos = Medicamentos.objects.all()
        serializer = MedicamentosSerializer(medicamentos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicamentosSerializer(medicamentos, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method in ['PUT', 'DELETE']:
        if not pk:
            return Response({'error': 'Se necesita ID'}, status=status.HTTP_404_BAD_REQUEST)
        user = get_object_or_404(medicamentos, pk = pk)
        
        if request.method == 'PUT':
            serializer = MedicamentosSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


# class ProfileUserViewSet(viewsets.ModelViewSet):
#     queryset = ProfileUser.objects.all()
#     serializer_class = ProfileUserSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

# class NotificacionesViewSet(viewsets.ModelViewSet):
#     queryset = Notificaciones.objects.all()
#     serializer_class = NotificacionesSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

# class RecetasMedicasViewSet(viewsets.ModelViewSet):
#     queryset = RecetasMedicas.objects.all()
#     serializer_class = RecetasMedicasSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

# class AlimentosViewSet(viewsets.ModelViewSet):
#     queryset = Alimentos.objects.all()
#     serializer_class = AlimentosSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

# class UsuariosViewSet(viewsets.ModelUsuarios):
#     queryset = Usuarios.objects.all()
#     serializer_class = UsuariosSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

# class MedicamentosViewSet(viewsets.ModelMedicamentos):
#     queryset = Medicamentos.objects.all()
#     serializer_class = MedicamentosSerializer

#     @api_view(['GET'])
#     def getData(request):
#         return Response (queryset)
#         serializer = ItemSerializer(items, many=True)
    
#     @api_view(['POST'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['PUT'])
#     def getData(request):
#         return Response (queryset)
    
#     @api_view(['DELETE'])
#     def getData(request):
#         return Response (queryset)

