from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ProfileUser, Notificaciones, RecetasMedicas, Alimentos, Usuarios, Medicamentos

# Create your views here.


# class ProfileUserViewSet(viewsets.ModelViewSet):
#     queryset = ProfileUser.objects.all()
#     serializer_class = ProfileUserSerializer

@api_view(['GET'])
def getData(request):
    profileUser = ProfileUser.objects.all()
    serializer = ProfileUserSerializer(profileUser, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)

# class NotificacionesViewSet(viewsets.ModelViewSet):
#     queryset = Notificaciones.objects.all()
#     serializer_class = NotificacionesSerializer

@api_view(['GET'])
def getData(request):
    notificaciones = Notificaciones.objects.all()
    serializer = NotificacionesSerializer(notificaciones, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)

# class RecetasMedicasViewSet(viewsets.ModelViewSet):
#     queryset = RecetasMedicas.objects.all()
#     serializer_class = RecetasMedicasSerializer

@api_view(['GET'])
def getData(request):
    recetasMedicas= RecetasMedicas.objects.all()
    serializer = RecetasMedicasSerializer(recetasMedicas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)

# class AlimentosViewSet(viewsets.ModelViewSet):
#     queryset = Alimentos.objects.all()
#     serializer_class = AlimentosSerializer

@api_view(['GET'])
def getData(request):
    alimentos = Alimentos.objects.all()
    serializer = AlimentosSerializer(alimentos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)

# class UsuariosViewSet(viewsets.ModelUsuarios):
#     queryset = Usuarios.objects.all()
#     serializer_class = UsuariosSerializer

@api_view(['GET'])
def getData(request):
    Usuarios = Usuarios.objects.all()
    serializer = Usuariosserializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)

# class MedicamentosViewSet(viewsets.ModelMedicamentos):
#     queryset = Medicamentos.objects.all()
#     serializer_class = MedicamentosSerializer

@api_view(['GET'])
def getData(request):
    medicamentos = Medicamentos.objects.all()
    serializer = MedicamentosSerializer(medicamentos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getData(request):
    return Response (queryset)

@api_view(['PUT'])
def getData(request):
    return Response (queryset)

@api_view(['DELETE'])
def getData(request):
    return Response (queryset)


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

