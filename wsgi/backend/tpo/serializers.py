from rest_framework import serializers

from tpo.models import Pregled, Uporabnik


class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Uporabnik
        fields = ('username', 'email', 'sifra')


class PregledSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pregled
        fields = ('opombe', 'datum', 'zdravnik')
