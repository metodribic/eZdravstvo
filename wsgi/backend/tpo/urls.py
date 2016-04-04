from django.conf.urls import url, include
from rest_framework import routers

from wsgi.backend.tpo.views import UporabnikiViewSet, PreglediViewSet, PostaViewSet

router = routers.DefaultRouter()
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)
router.register(r'posta', PostaViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]