from rest_framework import serializers
from rest_framework.authtoken.models import Token

from tpo.models import Pregled, Uporabnik, Posta, Roles, Ambulanta, Zdravnik, Meritev, Zdravilo, Bolezni, Dieta, Ustanova, Osebje

""" POSTA """
class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields =('id', 'kraj')

class VlogaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Roles
        fields = ('naziv',)

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

    class Meta:
        model = Zdravnik
        exclude = ('password', 'first_name', 'last_name', 'is_superuser', 'is_staff')


""" MERITEV """
class MeritevSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meritev


""" PREGELD """
class PregledSerializer(serializers.HyperlinkedModelSerializer):
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
    class Meta:
        model = Bolezni


""" DIETA """
class DietaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dieta


""" UPORABNIK """
class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()
    ambulanta = AmbulantaSerializer()
    #meritev = MeritevSerializer()
    zdravila = ZdraviloSerializer(many=True)
    bolezni = BolezniSerializer(many=True)
    zdravnik = ZdravnikSerializer(many=True)
    dieta = DietaSerializer(many=True)
    id = serializers.IntegerField()
    #pregledi = PregledSerializer(source='get_pregledi')

    class Meta:
        model = Uporabnik
        exclude = ('password','first_name', 'last_name', 'is_superuser', 'is_staff')


class LoginSerializer(serializers.Serializer):
    uporabnik = UporabnikSerializer()
    token = serializers.CharField(max_length=50)


class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField(max_length=500)
