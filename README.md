# This is awesome TPO project #
### Members ###
- Jernej Koželj
- Rok Mirt
- Luka Mrak
- Metod Ribič

### Installation guide ###

```shell
git clone git@bitbucket.org:rm9289/tpo.git
cd tpo
```
#### Frontend ####

We use [AngularJS](https://docs.angularjs.org/guide).
Template was stolen [here](https://almsaeedstudio.com/themes/AdminLTE/index2.html)

You will need npm, bower and ruby (compass).

- Install [compass](http://compass-style.org/install) and include in system path.

```shell
cd front/	# Assuming you are in project root
npm install
bower install
grunt serve	# To start frontend
grunt build # To build frontend for serving on Web server
```
#### Backend ####

We use [Django](http://www.django-rest-framework.org/).

You will need python and Django installed. Then install [Django Rest
Framework](http://www.django-rest-framework.org/#installation)

It is recommended to use virtualenv to avoid problems with other python projects.

```shell
cd wsgi/backend/	#Assuming you are in project root
# Create a virtualenv to isolate our package dependencies locally
virtualenv env
source env/bin/activate  # On Windows use env\Scripts\activate

# Install Django and Django REST framework into the virtualenv
pip install django
pip install djangorestframework

# Optional
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support

# Run server
python manage.py runserver
```

#### Database ####

Database creating is still in progress.

#### Deployment ####
Test server is at http://tpo-yoyosan.rhcloud.com/ (backend) and http://tpof-yoyosan.rhcloud.com/
(frontend).

We will use slavnik.fri.uni-lj.si as production server. More info soon.
