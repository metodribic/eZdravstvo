from rest_framework import serializers


from tpo.models import Pregled, Uporabnik, Posta



class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Uporabnik
        fields = ('username', 'email', 'sifra')


class PregledSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pregled
        fields = ('opombe', 'datum', 'zdravnik', 'meritve', 'bolezni', 'alergije', 'zdravila', 'dieta', 'navodila', 'datum_naslednji')


class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields = ('stevilka', 'kraj')
