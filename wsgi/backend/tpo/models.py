from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Uporabnik(User):
    sifra = models.CharField(max_length=1024)
    ambulanta = models.ForeignKey('Ambulanta')
    naslov = models.CharField(max_length=100)
    posta = models.ForeignKey('Posta')
    role = models.ForeignKey('Roles')


class Zdravnik(Uporabnik):
    naziv = models.CharField(max_length=50)


class Ambulanta(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)
    ustanova = models.ForeignKey('Ustanova')


class Ustanova(models.Model):
    naziv = models.CharField(max_length=100)
    naslov = models.CharField(max_length=100)


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


class Bolezni(models.Model):
    mkb10 = models.CharField(max_length=45)
    naziv = models.CharField(max_length=45)
    alergija = models.BooleanField()

