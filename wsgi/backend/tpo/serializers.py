from rest_framework import serializers


from tpo.models import Pregled, Uporabnik, Posta, Roles, Ambulanta, Zdravnik, Meritev, Zdravilo, Bolezni, Dieta


class VlogaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Roles
        fields = ('naziv',)


class AmbulantaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ambulanta


class PregledSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pregled


class PostaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posta
        fields = ('id', 'kraj')

class ZdravnikSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Zdravnik


class MeritevSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meritev


class ZdraviloSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Zdravilo


class BolezniSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bolezni


class DietaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dieta



class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()
    ambulanta = AmbulantaSerializer()
    pregledi = PregledSerializer()
    meritev = MeritevSerializer()
    zdravila = ZdraviloSerializer(many=True)
    bolezni = BolezniSerializer(many=True)
    zdravnik = ZdravnikSerializer(many=True)
    dieta = DietaSerializer(many=True)

    class Meta:
        model = Uporabnik
        #fields = ('username','ime','priimek','datum_rojstva','kraj_rojstva','naslov','posta','st_zzzs','spol','krvna_skupina','ambulanta','zdravnik','meritev','zdravila','bolezni','pregledi','role')








