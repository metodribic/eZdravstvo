from django.conf.urls import url, include
from rest_framework import routers

from tpo.views import UporabnikiViewSet, PreglediViewSet, PostaViewSet, login

router = routers.DefaultRouter()
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)
router.register(r'posta', PostaViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'login', login)
]
