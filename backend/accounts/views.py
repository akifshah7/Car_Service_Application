import jwt
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class FirebaseLoginAPIView(APIView):
    """
    This view generates a JWT token for an authenticated user using PyJWT.
    """

    def post(self, request):
        # Assuming that your custom Firebase authentication has already set request.user
        user = request.user
        if not user or not user.is_authenticated:
            return Response({"error": "Authentication failed."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the payload for the JWT token
        payload = {
            "user_id": user.id,
            "username": user.username,
            "exp": datetime.now(datetime.timezone.utc) + timedelta(minutes=30),  # Token expires in 30 minutes
            "iat": datetime.now(datetime.timezone.utc),  # Issued at time
        }

        # Encode the payload to create the JWT token
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        return Response({
            "token": token,
            "expires_in": 30 * 60  # 30 minutes in seconds
        })
