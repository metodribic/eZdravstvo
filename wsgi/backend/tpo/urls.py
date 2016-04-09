from django.conf.urls import url, include
from rest_framework import routers

from tpo.views import UporabnikiViewSet, PreglediViewSet, PostaViewSet, AmbulantaViewSet, UstanovaViewSet, ZdravnikViewSet, OsebjeViewSet

router = routers.DefaultRouter()
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)
router.register(r'posta', PostaViewSet)
router.register(r'ambulanta', AmbulantaViewSet)
router.register(r'ustanova', UstanovaViewSet)
router.register(r'zdravnik', ZdravnikViewSet)
router.register(r'osebje', OsebjeViewSet)


urlpatterns = [
    url(r'^', include(router.urls))
]
