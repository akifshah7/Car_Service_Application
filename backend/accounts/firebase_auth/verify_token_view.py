from django.http import JsonResponse
from firebase_admin import auth as firebase_auth

def verify_token_view(request):
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return JsonResponse({"error": "Authorization token missing."}, status=401)
    
    id_token = token.split("Bearer ")[1]
    
    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token.get("uid")
        return JsonResponse({"message": f"Token is valid for user {uid}."})
    except Exception as e:
        return JsonResponse({"error": "Invalid or expired token."}, status=401)
