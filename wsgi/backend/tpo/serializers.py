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
    id = serializers.IntegerField()
    class Meta:
        model = Roles
        fields = ('id', 'naziv')


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
    class Meta:
        model = Meritev


""" PREGELD """
class PregledSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    zdravnik = ZdravnikSerializer()
    meritve = MeritevSerializer()
    class Meta:
        model = Pregled


""" ZDRAVILO """
class ZdraviloSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Zdravilo


""" BOLEZNI """
class BolezniSerializer(serializers.HyperlinkedModelSerializer):
    zdravilo = ZdraviloSerializer(many=True)
    class Meta:
        model = Bolezni


""" DIETA NAVODILA """
class NavodilaDietaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NavodilaDieta


""" DIETA """
class DietaSerializer(serializers.HyperlinkedModelSerializer):
    navodila = NavodilaDietaSerializer(many=True)
    class Meta:
        model = Dieta


""" UPORABNIK """
class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()
    ambulanta = AmbulantaSerializer(read_only=True, partial=True)
    zdravila = ZdraviloSerializer(many=True, partial=True)
    bolezni = BolezniSerializer(many=True, partial=True)
    zdravnik = ZdravnikSerializer(many=True, partial=True)
    dieta = DietaSerializer(many=True, partial=True)
    is_superuser = serializers.BooleanField()
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


class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField(max_length=500)


""" ZDRAVNIK_UPORABNIKI """
class ZdravnikUporabnikiSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Uporabnik