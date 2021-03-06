from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _


class Uporabnik(User):
    ime = models.CharField(max_length=100, blank=True)
    priimek = models.CharField(max_length=100, blank=True)
    datum_rojstva = models.DateTimeField(blank=True, null=True)
    kraj_rojstva = models.CharField(max_length=50, blank=True)
    naslov = models.CharField(max_length=100, blank=True)
    posta = models.ForeignKey('Posta', blank=True, null=True)
    st_zzzs = models.IntegerField(blank=True, null=True)
    spol = models.CharField(max_length=6, blank=True)
    krvna_skupina = models.CharField(max_length=3, blank=True, null=True)
    ambulanta = models.ForeignKey('Ambulanta', blank=True, null=True)
    zdravnik = models.ManyToManyField('Zdravnik', blank=True)
    zdravila = models.ManyToManyField('Zdravilo', blank=True)
    bolezni = models.ManyToManyField('Bolezni', blank=True)
    dieta = models.ManyToManyField('Dieta', blank=True)
    role = models.ForeignKey('Roles')
    is_deleted = models.BooleanField(default=False)
    telefon = models.CharField(max_length=100, blank=True, null=True)
    kontaktna_oseba = models.ForeignKey('KontaktnaOseba', blank=True, null=True)
    oskrbovanci = models.ManyToManyField('self', blank=True)
    personalizacija = models.ForeignKey('PersonalizacijaNadzornePlosce', null=True, blank=True)


class Zdravnik(User):
    ime = models.CharField(max_length=100, blank=True)
    priimek = models.CharField(max_length=100, blank=True)
    sifra = models.ForeignKey('SifrantRegistriranih')
    naziv = models.CharField(max_length=50, blank=True)
    ambulanta = models.ForeignKey('Ambulanta', blank=True, null=True)
    tip = models.CharField(max_length=50, blank=True)       # ZDRAVNIK ALI ZOBOZDRAVNIK
    medicinske_sestre = models.ManyToManyField('Osebje', blank=True)
    role = models.ForeignKey('Roles')
    sprejema_paciente = models.BooleanField(default=True)
    prosta_mesta = models.IntegerField(default=10)
    ustanova = models.ForeignKey('Ustanova', blank=True, null=True)
    telefon = models.CharField(max_length=100, blank=True, null=True)


class UporabnikZdravnik(models.Model):
    zdravnik = models.ForeignKey('Zdravnik')
    uporabnik = models.ForeignKey('Uporabnik')
    
    class Meta:
        db_table = 'tpo_uporabnik_zdravnik'


class Osebje(User):
    ime = models.CharField(max_length=100, blank=True, null=True)
    priimek = models.CharField(max_length=100, blank=True, null=True)
    sifra = models.ForeignKey('SifrantRegistriranih')
    role = models.ForeignKey('Roles')
    ustanova = models.ForeignKey('Ustanova', blank=True, null=True)
    telefon = models.CharField(max_length=100, blank=True, null=True)


class SifrantRegistriranih(models.Model):
    sifra = models.IntegerField()
    is_used = models.BooleanField(default=False)


class Ustanova(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')


class Ambulanta(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')
    ustanova = models.ForeignKey('Ustanova')


class Posta(models.Model):
    kraj = models.CharField(max_length=100)


class Roles(models.Model):
    naziv = models.CharField(max_length=25)


class Dieta(models.Model):
    naziv = models.CharField(max_length=100)
    sifra = models.CharField(max_length=20)
    navodila = models.ManyToManyField('NavodilaDieta', blank=True)


class NavodilaDieta(models.Model):
    url = models.CharField(max_length=512)


class Zdravilo(models.Model):
    zdravilo = models.CharField(max_length=100)
    #navodila = models.CharField(max_length=1024)
    navodila = models.ManyToManyField('NavodilaZdravila', blank=True)

class NavodilaZdravila(models.Model):
    url = models.CharField(max_length=512)

class BolezniZdravila(models.Model):
    bolezni = models.ForeignKey('Bolezni')
    zdravilo = models.ForeignKey('Zdravilo')
    zbrisano = models.BooleanField(default=False)

    class Meta:
        db_table = 'tpo_bolezni_zdravilo'


class Pregled(models.Model):
    opombe = models.CharField(max_length=2048)
    datum = models.DateTimeField()
    zdravnik = models.ForeignKey('Zdravnik')
    bolezen = models.ManyToManyField('Bolezni')
    zdravilo = models.ManyToManyField('Zdravilo')
    dieta = models.ManyToManyField('Dieta')
    datum_naslednjega = models.DateTimeField(blank=True, null=True)
    uporabnik = models.ForeignKey('Uporabnik')


class Bolezni(models.Model):
    naziv = models.CharField(max_length=45)
    mkb10 = models.CharField(max_length=45)
    alergija = models.BooleanField()
    zdravilo = models.ManyToManyField('Zdravilo')
    clanki = models.ManyToManyField('ClanekBolezni')


class ClanekBolezni(models.Model):
    clanek = models.CharField(max_length=5000, blank=True)

    @property
    def title(self):
        return self._title


# Dovoljene(max,min,nemogoce) vrednosti za doloceno meritev
class VrednostiMeritev(models.Model):
    tip = models.CharField(max_length=50)
    enota = models.CharField(max_length=50)
    normalno_min = models.CharField(max_length=50)
    normalno_max = models.CharField(max_length=50)
    nenormalno_min = models.CharField(max_length=50)
    nenormalno_max = models.CharField(max_length=50)
    nemogoce_min = models.CharField(max_length=50)
    nemogoce_max = models.CharField(max_length=50)
    sifra = models.CharField(max_length=10)
    kdaj_se_meri=models.CharField(max_length=100)


class Meritev(models.Model):
    tip_meritve = models.ForeignKey('VrednostiMeritev')
    vrednost_meritve = models.CharField(max_length=100)
    datum = models.DateTimeField()
    uporabnik = models.ForeignKey('Uporabnik')
    pregled = models.ForeignKey('Pregled', null=True)


class IPLock(models.Model):
    ip = models.CharField(max_length=40)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    numOfTries = models.IntegerField(default=0)


class IsAlphanumericPasswordValidator(object):
    """
    Validate whether the password is alphanumeric
   """ 
    def validate(self, password, user=None):
        num = False
        char = False
        for c in password:
            if num == True and char == True:
                break
            if c.isdigit():
                num = True
            elif c.isalpha():
                char = True
        if num != True or char != True:
            raise ValidationError(
                _("This password is not alphanumeric."),
                code='password_not_alphanumeric',
            )

    def get_help_text(self):
        return _("Your password must contain at least one number and at least one character")


class KontaktnaOseba(models.Model):
    ime = models.CharField(max_length=100)
    priimek = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')
    sorodstveno_razmerje = models.CharField(max_length=100)
    telefon = models.CharField(max_length=100)


class PersonalizacijaNadzornePlosce(models.Model):
    datum_rojstva = models.BooleanField(default=True)
    kraj_rojstva = models.BooleanField(default=True)
    naslov = models.BooleanField(default=True)
    stevilka_zzzs = models.BooleanField(default=True)
    zdravnik = models.BooleanField(default=True)
    zobozdravnik = models.BooleanField(default=True)
    pregledi = models.IntegerField(default = 10)
    meritve = models.IntegerField(default = 10)
    bolezni = models.IntegerField(default = 10)
    zdravila = models.IntegerField(default = 10)
    diete = models.IntegerField(default=10)
    alergije = models.BooleanField(default=True)


