from django.conf.urls import url, include
from rest_framework import routers

from tpo.views import UporabnikiViewSet, PreglediViewSet, PostaViewSet, AmbulantaViewSet, UstanovaViewSet, ZdravnikViewSet, \
    OsebjeViewSet, MeritevViewSet, DietaViewSet, BolezniViewSet, ZdraviloViewSet, RolesViewSet, login


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)
router.register(r'posta', PostaViewSet)
router.register(r'ambulanta', AmbulantaViewSet)
router.register(r'ustanova', UstanovaViewSet)
router.register(r'zdravnik', ZdravnikViewSet)
router.register(r'osebje', OsebjeViewSet)
router.register(r'meritve', MeritevViewSet)
router.register(r'diete', DietaViewSet)
router.register(r'bolezni', BolezniViewSet)
router.register(r'zdravila', ZdraviloViewSet)
router.register(r'vloge', RolesViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'login', login)
]
