from django.urls import path
from .views import RegisterView, TaskCreateView, TaskListView, TaskRetrieveUpdateDestroy

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('task/', TaskCreateView.as_view(), name='task-create'),
    path('task/<int:pk>/', TaskRetrieveUpdateDestroy.as_view(), name='task-alter'),
    path('tasks/', TaskListView.as_view(), name='task-list'),
]
  

