from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Uporabnik(User):
    ime = models.CharField(max_length=100)
    priimek = models.CharField(max_length=100)
    datum_rojstva = models.DateField()
    kraj_rojstva = models.CharField(max_length=50)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')
    st_zzzs = models.IntegerField()
    spol = models.CharField(max_length=1)
    krvna_skupina = models.CharField(max_length=3)
    ambulanta = models.ForeignKey('Ambulanta')
    role = models.ForeignKey('Roles')
    zdravnik = models.ManyToManyField('Zdravnik')
    meritev = models.ForeignKey('Meritev')
    zdravila = models.ManyToManyField('Zdravilo')
    bolezni = models.ManyToManyField('Bolezni')
    pregledi = models.ForeignKey('Pregled')


class Zdravnik(User):
    ime = models.CharField(max_length=100)
    priimek = models.CharField(max_length=100)
    sifra = models.IntegerField()               # SIFRA USTANOVE
    naziv = models.CharField(max_length=50)
    ambulanta = models.ForeignKey('Ambulanta')
    tip = models.CharField(max_length=50)       # ZDRAVNIK ALI ZOBOZDRAVNIK
    medicinske_sestre = models.ForeignKey('Osebje')
    role = models.ForeignKey('Roles')


class Osebje(User):
    ime = models.CharField(max_length=100)
    priimek = models.CharField(max_length=100)
    sifra = models.IntegerField()               # SIFRA USTANOVE
    stevilka = models.IntegerField()            # STEVILKA MEDICINSKE SESTRE
    role = models.ForeignKey('Roles')


class Ambulanta(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')
    ustanova = models.ForeignKey('Ustanova')


class Ustanova(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')


class Posta(models.Model):
    stevilka = models.IntegerField()
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
    datum_naslednjega = models.DateField()


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

