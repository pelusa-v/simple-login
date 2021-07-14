from users.serializers import UserSerializer

# Don't response just token, response token + data
def jwt_default_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }