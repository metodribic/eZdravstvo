from rest_framework import viewsets


# Create your views here.
from wsgi.backend.tpo.models import Pregled, Uporabnik
from wsgi.backend.tpo.serializers import UporabnikSerializer, PregledSerializer


# USER
class UporabnikiViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Uporabnik.objects.all().order_by('-date_joined')
    serializer_class = UporabnikSerializer


# PREG
class PreglediViewSet(viewsets.ModelViewSet):
    queryset = Pregled.objects.all()
    serializer_class = PregledSerializer