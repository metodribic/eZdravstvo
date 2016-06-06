#!/usr/bin/env python

from setuptools import setup

setup(
    # GETTING-STARTED: set your app name:
    name='TPO',
    # GETTING-STARTED: set your app version:
    version='1.0',
    # GETTING-STARTED: set your app description:
    description='TPO App',
    # GETTING-STARTED: set author name (your name):
    author='Team 7',
    # GETTING-STARTED: set author email (your email):
    author_email='example@example.com',
    # GETTING-STARTED: set author url (your url):
    url='http://www.python.org/sigs/distutils-sig/',
    # GETTING-STARTED: define required django version:
    install_requires=[
        'Django==1.9.2',
        'djangorestframework==3.3.2',
        'mysqlclient==1.3.6',
        'django-cors-headers',
        'django-filter >= 0.11.0',
        'djangorestframework-filters'
    ],
    #dependency_links=[
    #    'https://pypi.python.org/simple/django/'
    #],
)
