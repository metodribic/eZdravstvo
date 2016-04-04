from rest_framework import serializers

from wsgi.backend.tpo.models import Pregled, Uporabnik, Posta


class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Uporabnik
        fields = ('username', 'email', 'sifra')


class PregledSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pregled
        fields = ('opombe', 'datum', 'zdravnik')


class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields = ('stevilka', 'kraj')