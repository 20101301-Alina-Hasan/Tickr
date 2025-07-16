from django.urls import path
from .views import RegisterView, TaskListCreate, TaskRetrieveUpdateDestroy

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroy.as_view(), name='task-detail'),
]
