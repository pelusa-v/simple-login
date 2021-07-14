from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):
    
    '''
    Handle user when signup (create token)
    '''
    
    token = serializers.SerializerMethodField('create_token')
    password = serializers.CharField(write_only=True)
    
    # add custom field token with above method ('create_token')
    def create_token(self, data):
        payload_setter = api_settings.JWT_PAYLOAD_HANDLER
        encode_setter = api_settings.JWT_ENCODE_HANDLER
        
        payload = payload_setter(data)
        token = encode_setter(payload)
        
        return token
    
    # edit default create method
    def create(self, data):
        # get password out of data
        password = data.pop('password', None)
        # set data on User instance
        user = self.Meta.model(**data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user
    
    class Meta:
        model = User
        fields = ('token', 'username', 'password')