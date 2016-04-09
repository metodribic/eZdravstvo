from rest_framework import viewsets


# Create your views here.
from tpo.models import Pregled, Uporabnik, Posta, Ambulanta, Ustanova, Zdravnik, Osebje, Meritev, Dieta, Bolezni, Zdravilo, Roles
from tpo.serializers import UporabnikSerializer, PregledSerializer, PostaSerializer, AmbulantaSerializer, UstanovaSerializer,ZdravnikSerializer, \
    OsebjeSerializer, MeritevSerializer, DietaSerializer, BolezniSerializer, ZdraviloSerializer, VlogaSerializer


#UPORABNIK
class UporabnikiViewSet(viewsets.ModelViewSet):
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


# ZDRAVNIK
class ZdravnikViewSet(viewsets.ModelViewSet):
    queryset = Zdravnik.objects.all()
    serializer_class = ZdravnikSerializer


# OSEBJE
class OsebjeViewSet(viewsets.ModelViewSet):
    queryset = Osebje.objects.all()
    serializer_class = OsebjeSerializer


# MERITVE
class MeritevViewSet(viewsets.ModelViewSet):
    queryset = Meritev.objects.all()
    serializer_class = MeritevSerializer


# MERITVE
class DietaViewSet(viewsets.ModelViewSet):
    queryset = Dieta.objects.all()
    serializer_class = DietaSerializer


# BOLEZNI
class BolezniViewSet(viewsets.ModelViewSet):
    queryset = Bolezni.objects.all()
    serializer_class = BolezniSerializer


# ZDRAVILO
class ZdraviloViewSet(viewsets.ModelViewSet):
    queryset = Zdravilo.objects.all()
    serializer_class = ZdraviloSerializer


# ZDRAVILO
class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = VlogaSerializer