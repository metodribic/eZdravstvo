from rest_framework import serializers
from rest_framework.authtoken.models import Token

from tpo.models import Pregled, Uporabnik, Posta, Roles, Ambulanta, Zdravnik, Meritev, Zdravilo, Bolezni, Dieta, Ustanova, Osebje, NavodilaDieta

""" POSTA """
class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields =('id', 'kraj')


""" VLOGA """
class VlogaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Roles
        fields = ('naziv',)

""" USTANOVA """
class UstanovaSerializer(serializers.HyperlinkedModelSerializer):
    posta = PostaSerializer()

    class Meta:
        model = Ustanova


""" AMBULANTA """
class AmbulantaSerializer(serializers.HyperlinkedModelSerializer):
    ustanova = UstanovaSerializer()
    posta = PostaSerializer()

    class Meta:
        model = Ambulanta


""" OSEBJE/MED. SESTRE """
class OsebjeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Osebje
        exclude = ('password', 'first_name', 'last_name', 'is_superuser', 'is_staff')


""" ZDRAVNIK """
class ZdravnikSerializer(serializers.HyperlinkedModelSerializer):
    ambulanta = AmbulantaSerializer()
    role = VlogaSerializer()
    medicinske_sestre = OsebjeSerializer()
    id = serializers.IntegerField()  #For some reason not included otherwise

    class Meta:
        model = Zdravnik
        exclude = ('password', 'first_name', 'last_name', 'is_superuser', 'is_staff')


""" MERITEV """
class MeritevSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Meritev




""" ZDRAVILO """
class ZdraviloSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Zdravilo


""" BOLEZNI """
class BolezniSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    zdravilo = ZdraviloSerializer(many=True)
    class Meta:
        model = Bolezni


""" DIETA NAVODILA """
class NavodilaDietaSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = NavodilaDieta


""" DIETA """
class DietaSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    navodila = NavodilaDietaSerializer(many=True)
    class Meta:
        model = Dieta


""" PREGLED """
class PregledSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    zdravnik = ZdravnikSerializer()
    meritve = MeritevSerializer()
    bolezen = BolezniSerializer(many=True)
    dieta = DietaSerializer(many=True)
    zdravilo = ZdraviloSerializer(many=True)
    class Meta:
        model = Pregled


""" UPORABNIK """
class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()
    ambulanta = AmbulantaSerializer()
    zdravila = ZdraviloSerializer(many=True)
    bolezni = BolezniSerializer(many=True)
    zdravnik = ZdravnikSerializer(many=True)
    dieta = DietaSerializer(many=True)
    is_superuser = serializers.BooleanField()   # REMOVE LATER
    id = serializers.IntegerField()
    is_superuser = serializers.BooleanField()

    class Meta:
        model = Uporabnik
        exclude = ('password','first_name', 'last_name', 'is_superuser', 'is_staff')


class LoginSerializer(serializers.Serializer):
    uporabnik = UporabnikSerializer()
    token = serializers.CharField(max_length=50)


class LoginZdravnikSerializer(serializers.Serializer):
    zdravnik = ZdravnikSerializer()
    token = serializers.CharField(max_length=50)
    
class LoginOsebjeSerializer(serializers.Serializer):
    osebje = OsebjeSerializer()
    token = serializers.CharField(max_length=50)


class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField(max_length=500)


""" ZDRAVNIK_UPORABNIKI """
class ZdravnikUporabnikiSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Uporabnik
