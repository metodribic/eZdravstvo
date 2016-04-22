from django.contrib.auth.decorators import user_passes_test
from django.core.serializers import json
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes
from django.contrib.auth import authenticate
from rest_framework.renderers import JSONRenderer
from rest_framework.authtoken.models import Token
from django.core import serializers
from django.http import HttpResponse, request
import traceback, datetime
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings



# Create your views here.
from tpo.models import Pregled, Uporabnik, Posta, Ambulanta, Ustanova, Zdravnik, Osebje, Meritev, Dieta, Bolezni, Zdravilo, Roles, User, IPLock, \
    NavodilaDieta, SifrantRegistriranih, VrednostiMeritev, KontaktnaOseba, Oskrbovanec

from tpo.serializers import UporabnikSerializer, PregledSerializer, PostaSerializer, AmbulantaSerializer, UstanovaSerializer,ZdravnikSerializer, \
    OsebjeSerializer, MeritevSerializer, DietaSerializer, BolezniSerializer, ZdraviloSerializer, VlogaSerializer, LoginSerializer, ErrorSerializer, \
    LoginZdravnikSerializer, NavodilaDietaSerializer, ZdravnikUporabnikiSerializer, LoginOsebjeSerializer, SifrantRegistriranihSerializer, \
    VrednostiMeritevSerializer, KontaktnaOsebaSerializer, OskrbovanecSerializer




class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@permission_classes((IsAuthenticated,))
#UPORABNIK
class UporabnikiViewSet(viewsets.ModelViewSet):
    queryset = Uporabnik.objects.all().order_by('-date_joined')
    serializer_class = UporabnikSerializer


# PREGLED
@permission_classes((IsAuthenticated,))
class PreglediViewSet(viewsets.ModelViewSet):
    queryset = Pregled.objects.all()
    serializer_class = PregledSerializer

    def get_queryset(self):
        user = self.request.user
        return Pregled.objects.filter(uporabnik = user)

# MERITVE
class MeritevViewSet(viewsets.ModelViewSet):
    queryset = Meritev.objects.all()
    serializer_class = MeritevSerializer

    def get_queryset(self):
        user = self.request.user
        return Meritev.objects.filter(uporabnik=user)


# POSTA
class PostaViewSet(viewsets.ModelViewSet):
    queryset = Posta.objects.all()
    serializer_class = PostaSerializer


# AMBULANTA
class AmbulantaViewSet(viewsets.ModelViewSet):
    queryset = Ambulanta.objects.all()
    serializer_class = AmbulantaSerializer


# USTANOVA
class UstanovaViewSet(viewsets.ModelViewSet):
    queryset = Ustanova.objects.all()
    serializer_class = UstanovaSerializer


# ZDRAVNIK
@permission_classes((IsAuthenticated,))
class ZdravnikViewSet(viewsets.ModelViewSet):
    queryset = Zdravnik.objects.all()
    serializer_class = ZdravnikSerializer


# VSI PACIENTI ENEGA ZDRAVNIKA
@permission_classes((IsAuthenticated,))
class ZdravnikUporabnikiViewSet(viewsets.ModelViewSet):
    queryset = Uporabnik.objects.all()
    serializer_class = ZdravnikUporabnikiSerializer

    def get_queryset(self):
        return Uporabnik.objects.filter(zdravnik__id=self.request.user.id)


# OSEBJE
class OsebjeViewSet(viewsets.ModelViewSet):
    queryset = Osebje.objects.all()
    serializer_class = OsebjeSerializer


# NAVODILO DIETA
class NavodiloDietaViewSet(viewsets.ModelViewSet):
    queryset = NavodilaDieta.objects.all()
    serializer_class = NavodilaDietaSerializer


# DIETA
@permission_classes((IsAuthenticated,))
class DietaViewSet(viewsets.ModelViewSet):
    queryset = Dieta.objects.all()
    serializer_class = DietaSerializer

    def get_queryset(self):
        user = self.request.user
        return Dieta.objects.filter(uporabnik = user)


# BOLEZNI
@permission_classes((IsAuthenticated,))
class BolezniViewSet(viewsets.ModelViewSet):
    queryset = Bolezni.objects.all()
    serializer_class = BolezniSerializer

    def get_queryset(self):
        user = self.request.user
        return Bolezni.objects.filter(uporabnik = user)


@permission_classes((IsAuthenticated,))
# ZDRAVILO
class ZdraviloViewSet(viewsets.ModelViewSet):
    queryset = Zdravilo.objects.all()
    serializer_class = ZdraviloSerializer

    def get_queryset(self):
        user = self.request.user
        return Zdravilo.objects.filter(uporabnik=user)


# ROLES
class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = VlogaSerializer


@api_view(['POST'])
def login(request, format=None):
    """
    Do login
    """
    try: 
        # check if email and password are received or return 400
        email = request.data['email']
        password = request.data['password']
        clientIp = request.META['REMOTE_ADDR']
        user = authenticate(username=email, password=password) # Returns User or None
        if user is not None:
            if user.is_active:
                token = Token.objects.get_or_create(user=user)
                try:
                    ipLock = IPLock.objects.get(user=user, ip=clientIp)    #Remove IP Lock
                    ipLock.delete()
                except ObjectDoesNotExist:
                    pass
                user.last_login = datetime.datetime.now()
                user.save()
                try:
                    UporabnikInst = Uporabnik.objects.get(user_ptr_id = user.id) 
                    return JSONResponse(LoginSerializer({'token':token[0], 'uporabnik':UporabnikInst}, context={'request': request}).data)
                except ObjectDoesNotExist:
                    try:
                        ZdravnikInst = Zdravnik.objects.get(user_ptr_id = user.id) 
                        return JSONResponse(LoginZdravnikSerializer({'token':token[0], 'zdravnik':ZdravnikInst}, context={'request': request}).data)
                    except ObjectDoesNotExist:
                        OsebjeInst = Osebje.objects.get(user_ptr_id = user.id) 
                        return JSONResponse(LoginOsebjeSerializer({'token':token[0], 'osebje':OsebjeInst}, context={'request': request}).data)
            else:
                response = JSONResponse({"error": "Uporabnik se ni aktiviran ali pa je IP zaklenjen"})
                response.status_code = 400
                return response
        else:
            try:
                incUser = User.objects.get(email=email) #Find user trying to login
                ipLock = IPLock.objects.get_or_create(user=incUser, ip=clientIp)[0]    #Create lock 
                ipLock.numOfTries = ipLock.numOfTries + 1
                ipLock.save();

                if(ipLock.numOfTries >= 3):   #Disable user
                    incUser.is_active = False
                    incUser.save();

            except ObjectDoesNotExist:
                pass    #Doesn't exist, no one cares. Pass.
            response = JSONResponse({"error": "Invalid login"})
            response.status_code = 401
            return response
    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error":"Usage: {'email':'someone@someplace', 'password':'password'}"})
        response.status_code = 400; # Bad request
        return response


@api_view(['POST'])
def registracijaAdmin(request, format=None):
    """
    Admin create new user
    """
    try:
        #print(request.data)
        # check if email and password are received or return 400
        mail = request.data['email']
        passw = request.data['password']
        rola = request.data['role']

        # get values or empty string if not there
        ime = request.data.get('ime', "")
        prii = request.data.get('priimek', "")

        sprejemaPac = request.data.get('sprejemaPaciente', 1)
        novaStev = request.data.get('stevilka', 49)

        if( rola == 'Zdravnik'):
            sifra = request.data.get('sifraZdr', "")
            novMail = Zdravnik.objects.filter(sifra=sifra).delete()
        else:
            sifra = request.data.get('sifraSes', "")
            novMail = Osebje.objects.filter(sifra=sifra).delete()

        if( ime != "" ):

            if( rola == 'Zdravnik'):
                naziv = request.data.get('naziv', "")
                tip = request.data.get('tip', "")
                ambulanta = request.data.get('izbranaAmbulanta', "")
                medSestraUsermame = request.data.get('izbranaSestra', "")

                ambul_id = ambulanta.split("/")[-1]
                sestra_id = User.objects.get(username=medSestraUsermame).pk

        # check if sifra == number
        try:
            novaSifra = int(sifra)
        except ValueError:
            novaSifra = 1337
        try:
            novaStev = int(novaStev)
        except:
            novaStev = 113377

        #print "check role"
        if( rola == 'Zdravnik'):
            if (Zdravnik.objects.filter(email=mail).exists() ):
                #print "already exists"
                #traceback.print_exc()
                respons = JSONResponse({"error": "User with this email already exists"})
                respons.status_code = 400;  # Bad request
                return respons
            else:
                validate_password(password=passw)
                # check only ime - same as in login
                if( ime != "" ):
                    zdr = Zdravnik.objects.create_user(username=mail, email=mail, password=passw,
                            sifra=novaSifra,sprejema_paciente=sprejemaPac, role_id=2, ime=ime, priimek=prii,
                            naziv=naziv, tip=tip, ambulanta_id=ambul_id, medicinske_sestre_id=sestra_id, is_staff=1)
                else:
                    zdr = Zdravnik.objects.create_user(username=mail, email=mail, password=passw,
                            sifra=novaSifra, sprejema_paciente=sprejemaPac, role_id=2, is_staff=1)

                respons = JSONResponse({"success": "function : {'user created':'Zdravnik'}"})
                respons.status_code = 201
                return respons


        elif( rola == 'Medicinska sestra'):

            if ( Osebje.objects.filter(email=mail).exists()):
                respons = JSONResponse({"error": "User with this email already exists"})
                respons.status_code = 400;  # Bad request
                return respons
            else:
                #print "NURSE"
                validate_password(password=passw)
                medSest = Osebje.objects.create_user(username=mail, email=mail, is_staff=1,ime=ime,
                              priimek=prii, sifra=novaSifra, stevilka=novaStev, password=passw, role_id=3 )
                respons = JSONResponse({"success": "function : {'user created':'Medicinska sestra'}"})

                respons.status_code = 201
                return respons
    except ValidationError as ve:
        response = JSONResponse({"error": "WeakPassword"})
        response.status_code = 400
        return response
    except IntegrityError as e:
        #Exception raised when the relational integrity of the database
        #is affected, e.g. a foreign key check fails, duplicate key, etc.

        traceback.print_exc()
        respons = JSONResponse({"error": "{'type' : 'Integrity error'}"})
        respons.status_code = 422
        return respons

    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error" : "Usage: {'email':'someone@someplace', 'password':'password'}"})
        response.status_code = 400 # Bad request
        return response


@api_view(['POST'])
def registracijaPacient(request, format=None):
    """
    Create new user
    """
    try:
        #print(request.data)
        # check if email and password are received or return 400
        mail = request._data['email']
        password = request.data['password']

         #opcijska polja
        ime = request.data.get('ime', "")
        priimek = request.data.get('priimek', "")
        st_zzzs = request.data.get('zdravstvenaSt', 0000)
        spol = request.data.get('spol', "")
        krvnaSkupina = request.data.get('krvnaSkupina', "")
        kraj_rojstva = request.data.get('krajRojstva', "")
        naslov = request.data.get('naslov', "")

        try:
            [y,m,d] = ((request.data.get('datumRojstva', [2000, 20, 12])).split("T")[0]).split("-")
            tmpD = int(d)
            tmpD = tmpD + 1
            # dan pride 10, na fieldu pa je 11 (zacne z 0 al neki)
            datum_rojstva = datetime.date(int(y), int(m), int(tmpD) )
            print datum_rojstva
        except ValueError as date_ve:
            datum_rojstva = datetime.date(2000, 20, 12)


        if (Uporabnik.objects.filter(email=mail).exists() ):
            respons = JSONResponse({"error": "User with this email already exists"})
            respons.status_code = 400;  # Bad request
            return respons
        else:
            validate_password(password=password)
            # check only ime - same as in login
            if( ime != "" ):
                pacient = Uporabnik.objects.create_user(username=mail, email=mail, password=password, role_id="4", is_active=False,
                            ime=ime, priimek=priimek, st_zzzs=st_zzzs, spol=spol, krvna_skupina=krvnaSkupina,
                            datum_rojstva=datum_rojstva, kraj_rojstva=kraj_rojstva, naslov=naslov)
            else:
                pacient = Uporabnik.objects.create_user(username=mail, email=mail,
                            password=password, datum_rojstva=datetime.date(2008, 3, 12), role_id="4", is_active=False)


            #posljes mail za aktivacijo
            send_mail('Aktivacija eZdravstvo', 'Uspesno ste se registrirali na portal eZdravstvo. Za aktivacijo profila, kliknite na spodnji naslov: \n\n\n' +
                      settings.API_URL+'/activate/?email='+mail, 'ezdravstvo.tpo7@gmail.com', [mail], fail_silently=False)

            respons = JSONResponse({"success": "function : {'user created':'Pacient'}"})
            respons.status_code = 201
            return respons


        respons = JSONResponse({"success": "function : {'user created':'Pacient'}"})
        respons.status_code = 201
        return respons

    except ValidationError as ve:
        print ve
        response = JSONResponse({"error": "WeakPassword"})
        response.status_code = 400
        return response
    except IntegrityError as e:
        #Exception raised when the relational integrity of the database
        #is affected, e.g. a foreign key check fails, duplicate key, etc.

        traceback.print_exc()
        respons = JSONResponse({"error": "{'type' : 'Integrity error'}"})
        respons.status_code = 422
        return respons

    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error" : "Usage: {'email':'someone@someplace', 'password':'password'}"})
        response.status_code = 400 # Bad request
        return response



@api_view(['GET'])
def aktivacija(request, format=None):
    """
    Create new user
    """


    try:
        print(request)

        # check if email and password are received or return 400
        mail = request._request.GET['email']
        print(mail)
        try:
            uporabniki = Uporabnik.objects.get(email=mail)
        except Exception as e1:
           print(e1)
        print(uporabniki)


        if(uporabniki != None):
            uporabniki.is_active = True
            uporabniki.save()

        else:
            print("Prislo je do napake!")

        respons = JSONResponse({"success": "function : {'user created':'Pacient'}"})
        respons.status_code = 201
        return respons

    except ValidationError as ve:
        print ve
        response = JSONResponse({"error": "WeakPassword"})
        response.status_code = 400
        return response
    except IntegrityError as e:
        #Exception raised when the relational integrity of the database
        #is affected, e.g. a foreign key check fails, duplicate key, etc.

        traceback.print_exc()
        respons = JSONResponse({"error": "{'type' : 'Integrity error'}"})
        respons.status_code = 422
        return respons

    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error" : "Usage: {'email':'someone@someplace', 'password':'password'}"})
        response.status_code = 400 #Bad request
        return response



@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def changePassword(request, format=None):
    """
    Change user's password
    """
    try: 
        # check if email and password are received or return 400
        oldpass = request.data['old_password']
        newpass = request.data['new_password']
        id = request.data['id']
        try:
            user = User.objects.get(id=id)
            if user.check_password(oldpass):
                try: 
                    validate_password(newpass)
                    user.set_password(newpass)
                    user.save()
                    response = Response()
                    response.status_code = 200
                    return response
                except ValidationError as e:
                    print(e)
                    response = JSONResponse({"error": "Please choose better password. It should be at least 8 characters long and contain mixed letters and numbers. "
                                                      "Also, it should not be too common (like 'test' etc)"})
                    response.status_code = 400
                    return response
            else:
                response = JSONResponse({"error": "Wrong password"})
                response.status_code = 401
                return response

        except ObjectDoesNotExist:
            response = JSONResponse({"error": "User does not exist"})
            response.status_code = 400
            return response
    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error":"Unknown error"})
        response.status_code = 500; # Bad request
        return response


# Sifranti registriranih zdravnikov/med. sester
class SifrantRegistriranihViewSet(viewsets.ModelViewSet):
    queryset = SifrantRegistriranih.objects.all()
    serializer_class = SifrantRegistriranihSerializer


class VrednostiMeritevViewSet(viewsets.ModelViewSet):
    queryset = VrednostiMeritev.objects.all()
    serializer_class = VrednostiMeritevSerializer


class KontaktnaOsebaViewSet(viewsets.ModelViewSet):
    queryset = KontaktnaOseba.objects.all()
    serializer_class = KontaktnaOsebaSerializer


class OskrbovanecViewSet(viewsets.ModelViewSet):
    queryset = Oskrbovanec.objects.all()
    serializer_class = OskrbovanecSerializer