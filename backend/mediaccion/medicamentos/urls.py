from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UsersViews),
    path('users/crear', views.CrearUser),
    path('users/profile/me', views.ProfileView),

    path('notificaciones/profile/me', views.NotificacionesView),
    path('notificaciones/profile/me/<int:pk>/', views.NotificacionesDetailView),

    path('recetasmedicas/profile/me', views.RecetasMedicasView),
    path('recetasmedicas/profile/me/<int:pk>/', views.RecetasMedicasDetailView),

    path('alimentos/profile/me', views.AlimentosView),
    path('alimentos/profile/me/<int:pk>/', views.AlimentosDetailView),

    path('medicamentos/', views.MedicamentosView),
    path('medicamentos/<int:pk>/', views.MedicamentosView),
]