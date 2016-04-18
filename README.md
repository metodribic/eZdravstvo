# This is awesome TPO project #

### Status ###
[![wercker status](https://app.wercker.com/status/aeb20820488130dfb55a14330a7e056b/m "wercker
status")](https://app.wercker.com/project/bykey/aeb20820488130dfb55a14330a7e056b)
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

# Install Django and Django REST framework into the virtualenv (or run python setup.py install)
pip install django
pip install djangorestframework
pip install mysqlclient

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

Database access: https://tpo-yoyosan.rhcloud.com/phpmyadmin/

Database: *tpo*

User: admin8fE6BsS

Password: FZ8f7A5_cLhZ 

Production server is located at 
http://be-tpo1.rhcloud.com and http://fe-tpo1.rhcloud.com

Database access: https://be-tpo1.rhcloud.com/phpmyadmin/

Database: *tpo*

User: adminpxiUIfV

Password:  dAh2A2W8h1_q 