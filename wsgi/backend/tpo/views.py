from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes
from django.contrib.auth import authenticate
from rest_framework.renderers import JSONRenderer
from rest_framework.authtoken.models import Token
from django.core import serializers
from django.http import HttpResponse
import hashlib, traceback
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from tpo.models import Pregled, Uporabnik, Posta
from tpo.serializers import UporabnikSerializer, PregledSerializer, PostaSerializer, LoginSerializer, ErrorSerializer

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


# USER
@permission_classes((IsAuthenticated,))
class UporabnikiViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Uporabnik.objects.all().order_by('-date_joined')
    serializer_class = UporabnikSerializer


# PREGLED
@permission_classes((IsAuthenticated,))
class PreglediViewSet(viewsets.ModelViewSet):
    queryset = Pregled.objects.all()
    serializer_class = PregledSerializer


# POSTA
class PostaViewSet(viewsets.ModelViewSet):
    queryset = Posta.objects.all()
    serializer_class = PostaSerializer


@api_view(['POST'])
def login(request, format=None):
    """
    Do login
    """
    try: 
        # check if email and password are received or return 400
        print str(request.body)
        email = request.data['email']
        password = request.data['password']
        user = authenticate(username=email, password=password) # Returns User or None
        if user is not None:
            if user.is_active:
                token = Token.objects.get_or_create(user=user)
                UporabnikInst = Uporabnik.objects.get(user_ptr_id = user.id)
                login(request, user);
                if(UporabnikInst):  #Can be Uporabnik or Zdravnik
                    return JSONResponse(LoginSerializer({'token':token[0], 'uporabnik':UporabnikInst}).data)
            else:
                response = JSONResponse({"error": "Uporabnik se ni aktiviran"})
                response.status_code = 400
        else:
            response = JSONResponse({"error": "Invalid login"})
            response.status_code = 401
            return response
    except Exception as ex:
        print str(ex)
        traceback.print_exc()
        response = JSONResponse({"error":"Usage: {'email':'someone@someplace', 'password':'password'}"})
        response.status_code = 400; # Bad request
        return response
