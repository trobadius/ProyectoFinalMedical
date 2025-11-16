from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserCrud),
    path('users/<int:pk>/', views.UserCrud),

    path('notificaciones/', views.NotificacionesView),
    path('notificaciones/<int:pk>/', views.NotificacionesView),

    path('recetasmedicas/', views.RecetasMedicasView),
    path('recetasmedicas/<int:pk>/', views.RecetasMedicasView),

    path('alimentos/', views.AlimentosView),
    path('alimentos/<int:pk>/', views.AlimentosView),

    path('medicamentos/', views.MedicamentosView),
    path('medicamentos/<int:pk>/', views.MedicamentosView),
]