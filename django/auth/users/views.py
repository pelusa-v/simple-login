from django.contrib.auth.models import User

from rest_framework import permissions, serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

# all views are protected by token

@api_view(['GET'])
def current_user(request):
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class CreateUser(APIView):
    
    # token protection is not required on sign up
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        print('Hello!')
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)