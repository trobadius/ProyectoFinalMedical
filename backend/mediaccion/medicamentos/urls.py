from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileUserView), #get y post
    path('profile/<int:pk>/', views.ProfileUserView), #put y delete

    path('notificaciones/', views.NotificacionesView),
    path('notificaciones/<int:pk>/', views.NotificacionesView),

    path('recetasmedicas/', views.RecetasMedicasView),
    path('recetasmedicas/<int:pk>/', views.RecetasMedicasView),

    path('alimentos/', views.AlimentosView),
    path('alimentos/<int:pk>/', views.AlimentosView),

    path('usuarios/', views.UsuariosView),
    path('usuarios/<int:pk>/', views.UsuariosView),

    path('medicamentos/', views.MedicamentosView),
    path('medicamentos/<int:pk>/', views.MedicamentosView),
]