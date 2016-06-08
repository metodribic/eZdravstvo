from django.conf.urls import url, include
from rest_framework import routers

from tpo.views import UporabnikiViewSet, PreglediViewSet, PostaViewSet, AmbulantaViewSet, UstanovaViewSet, ZdravnikViewSet, \
    OsebjeViewSet, MeritevViewSet, DietaViewSet, BolezniViewSet, ZdraviloViewSet, RolesViewSet, login,\
    NavodiloDietaViewSet, changePassword, ZdravnikUporabnikiViewSet, registracijaAdmin, registracijaPacient, aktivacija, \
    SifrantRegistriranihViewSet, VrednostiMeritevViewSet, KontaktnaOsebaViewSet, changeZdravnik, ustvariPregled, forgotPassword, \
    PersonalizacijaViewSet, urejanjeZdravilAdmin, ClanekBolezniViewSet, NavodilaZdravilaViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)
router.register(r'posta', PostaViewSet)
router.register(r'ambulanta', AmbulantaViewSet)
router.register(r'ustanova', UstanovaViewSet)
router.register(r'zdravnik', ZdravnikViewSet)
router.register(r'personalizacija', PersonalizacijaViewSet)
router.register(r'osebje', OsebjeViewSet)
router.register(r'meritve', MeritevViewSet)
router.register(r'diete', DietaViewSet)
router.register(r'bolezni', BolezniViewSet)
router.register(r'zdravila', ZdraviloViewSet)
router.register(r'vloge', RolesViewSet)
router.register(r'navodilo_dieta', NavodiloDietaViewSet)
router.register(r'zdravnik_uporabniki', ZdravnikUporabnikiViewSet)
router.register(r'sifrant_registriranih', SifrantRegistriranihViewSet)
router.register(r'vrednosti_meritev', VrednostiMeritevViewSet)
router.register(r'kontaktna_oseba', KontaktnaOsebaViewSet)
router.register(r'clanki_bolezni', ClanekBolezniViewSet)
router.register(r'zdravila_navodila', NavodilaZdravilaViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'login', login),
    url(r'pozabljeno-geslo', forgotPassword),
    url(r'change_password', changePassword),
    url(r'registracijaAdmin', registracijaAdmin),
    url(r'activate', aktivacija),
    url(r'registracijaPacient', registracijaPacient),
    url(r'menjava_zdravnika', changeZdravnik),
    url(r'ustvariPregled', ustvariPregled),
    url(r'zdravilaAdmin', urejanjeZdravilAdmin),
    url(r'ustvariPregled', ustvariPregled)
]
