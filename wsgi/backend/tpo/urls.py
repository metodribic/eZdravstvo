from django.conf.urls import url, include
from rest_framework import routers

from wsgi.backend.tpo.views import UporabnikiViewSet, PreglediViewSet

router = routers.DefaultRouter()
router.register(r'uporabniki', UporabnikiViewSet)
router.register(r'pregledi', PreglediViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]