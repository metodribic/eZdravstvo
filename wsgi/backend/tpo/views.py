from rest_framework import viewsets


# Create your views here.
from tpo.models import Pregled, Uporabnik, Posta, Ambulanta, Ustanova, Zdravnik, Osebje
from tpo.serializers import UporabnikSerializer, PregledSerializer, PostaSerializer, AmbulantaSerializer, UstanovaSerializer,ZdravnikSerializer, OsebjeSerializer


class UporabnikiViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Uporabnik.objects.all().order_by('-date_joined')
    serializer_class = UporabnikSerializer


# PREGLED
class PreglediViewSet(viewsets.ModelViewSet):
    queryset = Pregled.objects.all()
    serializer_class = PregledSerializer


# POSTA
class PostaViewSet(viewsets.ModelViewSet):
    queryset = Posta.objects.all()
    serializer_class = PostaSerializer


# AMBULANTA
class AmbulantaViewSet(viewsets.ModelViewSet):
    queryset = Ambulanta.objects.all()
    serializer_class = AmbulantaSerializer


# USTANOVA
class UstanovaViewSet(viewsets.ModelViewSet):
    queryset = Ustanova.objects.all()
    serializer_class = UstanovaSerializer


# USTANOVA
class ZdravnikViewSet(viewsets.ModelViewSet):
    queryset = Zdravnik.objects.all()
    serializer_class = ZdravnikSerializer


# OSEBJE
class OsebjeViewSet(viewsets.ModelViewSet):
    queryset = Osebje.objects.all()
    serializer_class = OsebjeSerializer