from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from django.conf import settings


class Uporabnik(User):
    ime = models.CharField(max_length=100, blank=True)
    priimek = models.CharField(max_length=100, blank=True)
    datum_rojstva = models.DateField(blank=True)
    kraj_rojstva = models.CharField(max_length=50, blank=True)
    naslov = models.CharField(max_length=100, blank=True)
    posta = models.ForeignKey('Posta', blank=True, null=True)
    st_zzzs = models.IntegerField(blank=True, null=True)
    spol = models.CharField(max_length=1, blank=True)
    krvna_skupina = models.CharField(max_length=3, blank=True, null=True)
    ambulanta = models.ForeignKey('Ambulanta', blank=True, null=True)
    zdravnik = models.ManyToManyField('Zdravnik', blank=True)
    #meritev = models.ForeignKey('Meritev', blank=True, null=True)
    zdravila = models.ManyToManyField('Zdravilo', blank=True)
    bolezni = models.ManyToManyField('Bolezni', blank=True)
    dieta = models.ManyToManyField('Dieta', blank=True)
    role = models.ForeignKey('Roles')



class Zdravnik(User):
    ime = models.CharField(max_length=100, blank=True)
    priimek = models.CharField(max_length=100, blank=True)
    sifra = models.IntegerField(blank=True)               # SIFRA USTANOVE
    naziv = models.CharField(max_length=50, blank=True)
    ambulanta = models.ForeignKey('Ambulanta', blank=True, null=True)
    tip = models.CharField(max_length=50, blank=True)       # ZDRAVNIK ALI ZOBOZDRAVNIK
    medicinske_sestre = models.ForeignKey('Osebje', blank=True, null=True)
    role = models.ForeignKey('Roles')
    sprejema_paciente = models.BooleanField()


class Osebje(User):
    ime = models.CharField(max_length=100)
    priimek = models.CharField(max_length=100)
    sifra = models.IntegerField()               # SIFRA USTANOVE
    stevilka = models.IntegerField()            # STEVILKA MEDICINSKE SESTRE
    role = models.ForeignKey('Roles')


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
    sifra = models.IntegerField()
    url = models.CharField(max_length=500)


class Zdravilo(models.Model):
    zdravilo = models.CharField(max_length=100)
    navodila = models.CharField(max_length=1024)


class Pregled(models.Model):
    opombe = models.CharField(max_length=2048)
    datum = models.DateField()
    zdravnik = models.ForeignKey('Zdravnik')
    meritve = models.ForeignKey('Meritev')
    bolezen = models.ManyToManyField('Bolezni')
    zdravilo = models.ManyToManyField('Zdravilo')
    dieta = models.ManyToManyField('Dieta')
    datum_naslednjega = models.DateField(blank=True, null=True)
    uporabnik = models.ForeignKey('Uporabnik')


class Bolezni(models.Model):
    mkb10 = models.CharField(max_length=45)
    naziv = models.CharField(max_length=45)
    alergija = models.BooleanField()
    zdravilo = models.ManyToManyField('Zdravilo')


class Meritev(models.Model):
    tip = models.CharField(max_length=50)
    enota = models.CharField(max_length=50)
    normalno_min = models.FloatField()
    normalno_max = models.FloatField()
    nenormalno_min = models.FloatField()
    nenormalno_max = models.FloatField()
    nemogoce_min = models.FloatField()
    nemogoce_max = models.FloatField()
    cas_merjenja = models.CharField(max_length=100)
    vrednost_meritve = models.FloatField()
    datum = models.DateField()
    uporabnik = models.ForeignKey('Uporabnik')


class IPLock(models.Model):
    ip = models.CharField(max_length=40)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    numOfTries = models.IntegerField(default=0)
