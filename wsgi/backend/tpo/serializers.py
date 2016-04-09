from rest_framework import serializers


from tpo.models import Pregled, Uporabnik, Posta, Roles


class VlogaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Roles
        fields = ('naziv',)


class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields = ('kraj',)


class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()

    class Meta:
        model = Uporabnik
        fields = ('username','ime','priimek','datum_rojstva','kraj_rojstva','naslov','posta','st_zzzs','spol','krvna_skupina','ambulanta','zdravnik','meritev','zdravila','bolezni','pregledi','role')


class PregledSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pregled
        fields = ('opombe','datum','zdravnik','meritve','bolezen','zdravilo','dieta','datum_naslednjega')




