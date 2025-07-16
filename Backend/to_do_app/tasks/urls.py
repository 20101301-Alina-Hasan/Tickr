from django.urls import path
from .views import RegisterView, TaskListCreate, TaskRetrieveUpdateDestroy
# from . import views

# urlpatterns = [
#     path('tasks/', views.tasks, name='tasks'),
# ]

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroy.as_view(), name='task-detail'),
]
