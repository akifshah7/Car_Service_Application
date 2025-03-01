import os
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from django.conf import settings
from rest_framework import authentication, exceptions
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

if not firebase_admin._apps:
    cred_path = os.path.join(settings.BASE_DIR, "serviceAccountKey.json")
    logger.debug(f"Initializing Firebase Admin with credentials from: {cred_path}")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    logger.info("Firebase Admin initialized successfully.")

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            logger.debug("No valid Authorization header found.")
            return None  # No token provided, so don't authenticate

        id_token = auth_header.split("Bearer ")[1].strip()
        logger.debug("Extracted Firebase token from header.")

        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
            logger.info(f"Token verified successfully: {decoded_token}")
        except Exception as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise exceptions.AuthenticationFailed("Invalid or expired token. " + str(e))

        uid = decoded_token.get("uid")
        if not uid:
            logger.error("Token missing UID.")
            raise exceptions.AuthenticationFailed("Invalid token: missing UID.")

        # Instead of using 'username', use the mobile_number field.
        phone_number = decoded_token.get("phone_number")
        if not phone_number:
            logger.error("Token missing phone_number.")
            raise exceptions.AuthenticationFailed("Firebase token does not include phone_number.")

        try:
            user, created = User.objects.get_or_create(
                mobile_number=phone_number,
            )
            if created:
                logger.info(f"Created new user for phone: {phone_number}")
            else:
                logger.info(f"Retrieved existing user for phone: {phone_number}")
        except Exception as e:
            logger.error(f"Error retrieving or creating user: {str(e)}")
            raise exceptions.AuthenticationFailed("Error processing user account.")

        return (user, id_token)
