from rest_framework import serializers
from rest_framework.authtoken.models import Token

from tpo.models import Pregled, Uporabnik, Posta, Roles, Ambulanta, Zdravnik, Meritev, Zdravilo, Bolezni, Dieta, \
    Ustanova, Osebje, NavodilaDieta, SifrantRegistriranih, VrednostiMeritev, KontaktnaOseba, \
    PersonalizacijaNadzornePlosce, ClanekBolezni

""" POSTA """
class PostaSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
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
    id = serializers.IntegerField()

    class Meta:
        model = Ustanova


""" AMBULANTA """
class AmbulantaSerializer(serializers.HyperlinkedModelSerializer):
    ustanova = UstanovaSerializer()
    posta = PostaSerializer()
    id = serializers.IntegerField()

    class Meta:
        model = Ambulanta


""" OSEBJE/MED. SESTRE """
class OsebjeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Osebje
        exclude = ('password', 'first_name', 'last_name', 'is_superuser', 'is_staff')


""" SIFRANT REGISTRIRANIH """
class SifrantRegistriranihSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = SifrantRegistriranih


""" ZDRAVNIK """
class ZdravnikSerializer(serializers.HyperlinkedModelSerializer):
    ambulanta = AmbulantaSerializer()
    role = VlogaSerializer()
    medicinske_sestre = OsebjeSerializer(many=True)
    id = serializers.IntegerField()
    sifra = SifrantRegistriranihSerializer()
    ustanova = UstanovaSerializer()

    class Meta:
        model = Zdravnik
        exclude = ('password', 'first_name', 'last_name', 'is_superuser', 'is_staff')

    def update(self, instance, validated_data):
        instance.ime = validated_data['ime']
        instance.priimek = validated_data['priimek']
        instance.email = validated_data['email']
        instance.telefon = validated_data['telefon']
        instance.sprejema_paciente = validated_data['sprejema_paciente']
        instance.prosta_mesta = validated_data['prosta_mesta']
        instance.ustanova_id = validated_data['ustanova']['id']
        instance.save()
        #Zdravnik.objects.filter(email=mail).exists()
        return instance



""" ZDRAVILO """
class ZdraviloSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Zdravilo

""" CLANKI OD BOLEZNI """
class ClanekBolezniSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = ClanekBolezni


""" BOLEZNI """
class BolezniSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    zdravilo = ZdraviloSerializer(many=True)
    clanki = ClanekBolezniSerializer(many=True)
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


""" Kontaktna oseba """
class KontaktnaOsebaSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    posta = PostaSerializer()
    class Meta:
        model = KontaktnaOseba

    def update(self, instance, validated_data):
        # posta extra cudna zadeva, ni cela v validated data...
        instance.posta_id = self._kwargs['data']['posta']['id']
        instance.ime = validated_data['ime']
        instance.priimek = validated_data['priimek']
        instance.naslov = validated_data['naslov']
        instance.telefon = validated_data['telefon']
        instance.sorodstveno_razmerje = validated_data['sorodstveno_razmerje']
        instance.save()
        return instance

    #def create(self, id, ime, priimek, naslov, posta, sorodstveno_razmerje, telefon):
    def create(self, validated_data):
        kontaktna = KontaktnaOseba(ime=validated_data['ime'],
                                   priimek=validated_data['priimek'],
                                   naslov=validated_data['naslov'],
                                   posta_id = self._kwargs['data']['posta']['id'],
                                   sorodstveno_razmerje=validated_data['sorodstveno_razmerje'],
                                   telefon=validated_data['telefon'])
        kontaktna.save()
        uporabnik = Uporabnik.objects.get(id =validated_data['id'])
        uporabnik.kontaktna_oseba_id = kontaktna.id
        uporabnik.save()
        return kontaktna

class PersonalizacijaNadzornePlosceSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = PersonalizacijaNadzornePlosce


""" UPORABNIK """
class UporabnikSerializer(serializers.HyperlinkedModelSerializer):
    role = VlogaSerializer()
    posta = PostaSerializer()
    ambulanta = AmbulantaSerializer(read_only=True, partial=True)
    zdravila = ZdraviloSerializer(many=True, partial=True)
    bolezni = BolezniSerializer(many=True, partial=True)
    zdravnik = ZdravnikSerializer(many=True, partial=True)
    dieta = DietaSerializer(many=True, partial=True)
    id = serializers.IntegerField()
    is_superuser = serializers.BooleanField()
    kontaktna_oseba = KontaktnaOsebaSerializer()
    personalizacija = PersonalizacijaNadzornePlosceSerializer()

    class Meta:
        model = Uporabnik
        depth = 3   # za prikaz zdravil pri boleznih
        exclude = ('password','first_name', 'last_name', 'is_superuser', 'is_staff')

    def update(self, instance, validated_data):
        # posta extra cudna zadeva, ni cela v validated data...
        instance.posta_id = self._kwargs['data']['posta']['id']
        instance.ime = validated_data['ime']
        instance.datum_rojstva = validated_data['datum_rojstva']
        instance.priimek = validated_data['priimek']
        instance.kraj_rojstva = validated_data['kraj_rojstva']
        instance.naslov = validated_data['naslov']
        instance.spol = validated_data['spol']
        instance.st_zzzs = validated_data['st_zzzs']
        instance.telefon = validated_data['telefon']
        instance.save()

        return instance

    def create(self, validated_data):
        oskrbovanec = Uporabnik(role_id=4)
        oskrbovanec.save()
        return oskrbovanec

class UporabnikZdravnik(serializers.HyperlinkedModelSerializer):
    uporabnik = UporabnikSerializer()
    zdravnik = ZdravnikSerializer()

    class Meta:
        db_table = "tpo_uporabnik_zdravnik"


""" VREDNOSTI MERITEV """
class VrednostiMeritevSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = VrednostiMeritev

    def update(self, instance, validated_data):
        instance.nemogoce_min = self._kwargs['data']['objekt']['nemogoce_min']
        instance.nemogoce_max = self._kwargs['data']['objekt']['nemogoce_max']
        instance.nenormalno_min = self._kwargs['data']['objekt']['nenormalno_min']
        instance.nenormalno_max = self._kwargs['data']['objekt']['nenormalno_max']
        instance.normalno_min = self._kwargs['data']['objekt']['normalno_min']
        instance.normalno_max = self._kwargs['data']['objekt']['normalno_max']
        instance.sifra = self._kwargs['data']['objekt']['sifra']
        instance.tip = self._kwargs['data']['objekt']['tip']
        instance.kdaj_se_meri = self._kwargs['data']['objekt']['kdaj_se_meri']
        instance.save()
        return instance


""" MERITEV """
class MeritevSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    tip_meritve = VrednostiMeritevSerializer()
    #uporabnik = UporabnikSerializer()

    class Meta:
        model = Meritev
        depth = 1

    def create(self, validated_data):
        meritev = Meritev(  tip_meritve_id=validated_data['tip_meritve']['id'],
                            vrednost_meritve = validated_data['vrednost_meritve'],
                            datum = validated_data['datum'],
                            uporabnik_id = self._kwargs['data']['uporabnik'],
                            pregled_id = None)
        meritev.save()
        return meritev

    def update(self, instance, validated_data):
        instance.vrednost_meritve = validated_data['vrednost_meritve']
        instance.save()
        return instance


""" PREGLED """
class PregledSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    zdravnik = ZdravnikSerializer()
    #meritve = MeritevSerializer()
    bolezen = BolezniSerializer(many=True)
    dieta = DietaSerializer(many=True)
    zdravilo = ZdraviloSerializer(many=True)
    class Meta:
        model = Pregled


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
        depth = 3   # izpise nested fielde (diete, bolezni,..)


class BolezniZdravila(serializers.HyperlinkedModelSerializer):
    bolezen = BolezniSerializer()
    zdravilo = ZdraviloSerializer()

    class Meta:
        db_table = "tpo_bolezni_zdravilo"




