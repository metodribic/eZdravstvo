import itertools, json as jsonn
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.hashers import make_password, check_password
from django.core.serializers import json
from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes, list_route
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes
from django.contrib.auth import authenticate
from rest_framework.renderers import JSONRenderer
from rest_framework.authtoken.models import Token
from django.core import serializers
from django.http import HttpResponse, request
import traceback, datetime, hashlib
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings
from pprint import pprint


# Create your views here.
from tpo.models import Pregled, Uporabnik, Posta, Ambulanta, Ustanova, Zdravnik, Osebje, Meritev, Dieta, Bolezni, Zdravilo, Roles, User, IPLock, \
    NavodilaDieta, SifrantRegistriranih, VrednostiMeritev, KontaktnaOseba, UporabnikZdravnik, IsAlphanumericPasswordValidator, \
    PersonalizacijaNadzornePlosce, BolezniZdravila, ClanekBolezni, NavodilaZdravila

from tpo.serializers import UporabnikSerializer, PregledSerializer, PostaSerializer, AmbulantaSerializer, UstanovaSerializer,ZdravnikSerializer, \
    OsebjeSerializer, MeritevSerializer, DietaSerializer, BolezniSerializer, ZdraviloSerializer, VlogaSerializer, LoginSerializer, ErrorSerializer, \
    LoginZdravnikSerializer, NavodilaDietaSerializer, ZdravnikUporabnikiSerializer, LoginOsebjeSerializer, SifrantRegistriranihSerializer, \
    VrednostiMeritevSerializer, KontaktnaOsebaSerializer, PersonalizacijaNadzornePlosceSerializer, ClanekBolezniSerializer, BolezniZdravilaSerializer, \
    NavodilaZdravilaSerializer

import random



class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@permission_classes((IsAuthenticated,))
class PersonalizacijaViewSet(viewsets.ModelViewSet):
    queryset = PersonalizacijaNadzornePlosce.objects.all()
    serializer_class = PersonalizacijaNadzornePlosceSerializer

    def create(self, request):
        userId = request.META.get('HTTP_PACIENT', None)
        if userId == None:
            userId = request.user.id
        try:
            user = Uporabnik.objects.get(user_ptr_id = userId)
            if hasattr(user, 'personalizacija') and user.personalizacija is not None:
                p = user.personalizacija
            else:
                p = PersonalizacijaNadzornePlosce.objects.create()
            for k,v in request.data.iteritems():
                setattr(p, k, v)
            p.save()
            user.personalizacija = p
            user.save()
            ps = PersonalizacijaNadzornePlosceSerializer(p, context={'request': request})
            return Response(ps.data)

        except ObjectDoesNotExist as e:
            print(e)
            response = JSONResponse({"error":"Uporabnik ne obstaja."})
            response.status_code = 404
            return response



@permission_classes((IsAuthenticated,))
#UPORABNIK
class UporabnikiViewSet(viewsets.ModelViewSet):
    queryset = Uporabnik.objects.all().order_by('-date_joined')
    serializer_class = UporabnikSerializer

    def destroy(self, request, pk):
        password = request.query_params.get('password_confirm', '')
        try:
            instance = Uporabnik.objects.get(user_ptr_id = pk)
        except Exception as e:
            response = JSONResponse({"error":"Uporabnik ne obstaja."})
            response.status_code = 404
            return response

        if password != '' and check_password(password, instance.password):
            instance.is_staff = True
            instance.save()
            response = JSONResponse({"message":"Uporabnik izbrisan."})
            return response
        else:
            response = JSONResponse({"error":"Nepravilno geslo."})
            response.status_code = 403
            return response

        response = JSONResponse({"error":"Neznana napaka."})
        response.status_code = 500
        return response


# PREGLED
class PreglediViewSet(viewsets.ModelViewSet):
    queryset = Pregled.objects.all()
    serializer_class = PregledSerializer

    def get_queryset(self):
        user = self.request.user
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
                user = Uporabnik.objects.get(user_ptr_id = pacient)
        except Exception as e:
            print(e)
        return Pregled.objects.filter(uporabnik = user).order_by('-id')


# MERITVE
class MeritevViewSet(viewsets.ModelViewSet):
    queryset = Meritev.objects.all()
    serializer_class = MeritevSerializer
    filter_backends = (filters.OrderingFilter,)


    def get_queryset(self):
        user = self.request.user
        tipMeritve = None
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
                user = Uporabnik.objects.get(user_ptr_id = pacient)
        except Exception as e:
            print(e)
            
        startDate = self.request.query_params.get('startDate', None)
        endDate = self.request.query_params.get('endDate', None)
        tipMeritveId = self.request.query_params.get('tipMeritveId', None)
        if tipMeritveId is not None:
            tipMeritve = VrednostiMeritev.objects.filter(id=tipMeritveId);

        if self.request.GET.get('pregledId', -1) != -1:
            pregledId = self.request.GET.get('pregledId', -1)
            if startDate is not None and endDate is not None and tipMeritve:
                return Meritev.objects.filter(uporabnik=user, pregled_id=pregledId, datum__range=[startDate, endDate], tip_meritve = tipMeritve)
            else:
                return Meritev.objects.filter(uporabnik=user, pregled_id=pregledId)
        else:
            if startDate is not None and endDate is not None and tipMeritve:
                return Meritev.objects.filter(uporabnik=user, datum__range=[startDate, endDate], tip_meritve = tipMeritve)
            return Meritev.objects.filter(uporabnik=user)


#MERITVE SEZNAM
class VrednostiMeritevViewSet(viewsets.ModelViewSet):
    queryset = VrednostiMeritev.objects.all()
    serializer_class = VrednostiMeritevSerializer

    @list_route(methods=['GET'])
    def seznam(self, request):
        queryset = VrednostiMeritev.objects.all()
        serializer = VrednostiMeritevSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


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
        user = self.request.user
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
               # user = Uporabnik.objects.get(user_ptr_id = pacient)
               pass
        except Exception as e:
            print(e)
        return Uporabnik.objects.filter(zdravnik__id=user.id)


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

    @list_route(methods=['POST'])
    def dodajClanekDieta(self, request):
        dieta = Dieta.objects.get(id=int(request.data['dieta']))
        navodilaD = NavodilaDieta(url=(request.data['url']))
        navodilaD.save()
        dieta.navodila.add(navodilaD)

        responseNavodilo = {}
        serializer = NavodilaDietaSerializer(navodilaD, context={'request': request})
        responseNavodilo['navodilo'] = serializer.data
        return JSONResponse(responseNavodilo)


    @list_route(methods=['DELETE'])
    def brisiClanekDieta(self, request):
        print request
        dieta = Dieta.objects.get(id=int(request.query_params['dieta']))
        navodilaD = NavodilaDieta.objects.get(id=int(request.query_params['data']))
        dieta.navodila.remove(navodilaD)
        response = Response()
        response.status_code = 204
        return response

    @list_route(methods=['GET'])
    def seznam(self, request):
        queryset = Dieta.objects.all()
        serializer = DietaSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
                user = Uporabnik.objects.get(user_ptr_id = pacient)
        except Exception as e:
            print(e)
        return Dieta.objects.filter(uporabnik = user)


# BOLEZNI
@permission_classes((IsAuthenticated,))
class BolezniViewSet(viewsets.ModelViewSet):
    queryset = Bolezni.objects.all()
    serializer_class = BolezniSerializer

    @list_route(methods=['POST'])
    def dodajClanek(self, request):
        bolezen = Bolezni.objects.get(id=int(request.data['bolezen']))
        clanek = ClanekBolezni(clanek=request.data['clanek'])
        clanek.save()
        bolezen.clanki.add(clanek)

        responseClanek = {}
        serializer = ClanekBolezniSerializer(clanek, context={'request': request})
        responseClanek['clanek'] = serializer.data
        return JSONResponse(responseClanek)



    @list_route(methods=['DELETE'])
    def brisiClanek(self, request):
        print request.query_params['bolezen']
        bolezen = Bolezni.objects.get(id=int(request.query_params['bolezen']))
        clanekB = ClanekBolezni.objects.get(id=int(request.query_params['data']))
        bolezen.clanki.remove(clanekB)
        response = Response()
        response.status_code = 204
        return response

    @list_route(methods=['GET'])
    def seznam(self, request):
        queryset = Bolezni.objects.all()

        for bolezen in queryset:
            tmp = BolezniZdravila.objects.filter(bolezni_id=bolezen.id)
            bolezen.deleted = BolezniZdravilaSerializer(tmp, many=True, context={'request': self.request}).data

        serializer = BolezniSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
 

    def get_queryset(self):
        user = self.request.user
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
                user = Uporabnik.objects.get(user_ptr_id = pacient)
        except Exception as e:
            print(e)

        bolezni = Bolezni.objects.filter(uporabnik = user)
        for bolezen in bolezni:
            tmp = BolezniZdravila.objects.filter(bolezni_id=bolezen.id)
            bolezen.deleted = BolezniZdravilaSerializer(tmp, many=True, context={'request': self.request}).data
        serializer = BolezniSerializer(bolezni, many=True, context={'request': self.request})
        return bolezni

# ZDRAVILO
@permission_classes((IsAuthenticated,))
class ZdraviloViewSet(viewsets.ModelViewSet):
    queryset = Zdravilo.objects.all()
    serializer_class = ZdraviloSerializer

    @list_route(methods=['POST'])
    def dodajClanekZdravilo(self, request):
        print request
        zdravilo = Zdravilo.objects.get(id=int(request.data['zdravilo']))
        navodiloZ = NavodilaZdravila(url=(request.data['url']))
        navodiloZ.save()
        zdravilo.navodila.add(navodiloZ)

        responseNavodilo = {}
        serializer = NavodilaZdravilaSerializer(navodiloZ, context={'request': request})
        responseNavodilo['navodilo'] = serializer.data
        return JSONResponse(responseNavodilo)

    @list_route(methods=['DELETE'])
    def brisiClanekZdravilo(self, request):
        print request
        zdravilo = Zdravilo.objects.get(id=int(request.query_params['zdravilo']))
        navodilaZ = NavodilaZdravila.objects.get(id=int(request.query_params['data']))
        zdravilo.navodila.remove(navodilaZ)
        response = Response()
        response.status_code = 204
        return response

    @list_route(methods=['GET'])
    def seznam(self, request):
        queryset = Zdravilo.objects.all()
        serializer = ZdraviloSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        try:
            pacient = self.request.META['HTTP_PACIENT']
            if pacient != None:
                user = Uporabnik.objects.get(user_ptr_id = pacient)
        except Exception as e:
            print(e)

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
            if user.is_staff:
                response = JSONResponse({'error': 'Uporabnik je izbrisan.'})
                response.status_code = 403
                return response
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
                response = JSONResponse({"error": "Uporabnik se ni aktiviran, je izbrisan ali pa je IP zaklenjen"})
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

        naziv = request.data.get('naziv', "")
        tip = request.data.get('tip', "")
        ambulanta = request.data.get('izbranaAmbulanta', "")
        ustanova = request.data.get('izbranaUstanova', "")

        sifra = request.data.get('sif', '000001')
        sifrantReg = SifrantRegistriranih.objects.get(sifra=sifra)
        try:
            sprejemaPac = (int)(sprejemaPac)
        except:
            sprejemaPac = 1

        if sprejemaPac == 1 :
            prostaMesta = request.data.get('prostaMesta', 10)
        else:
            prostaMesta = 0


        stev = request.data.get('stevilka', -1)

        ambul_id = ambulanta.split("/")[-1]
        ustan_id = ustanova.split("/")[-1]

        # izbrane sestre
        sestreUsernames = request.data.get('izbranaSestra', "")

        print (sestreUsernames)

        if( rola == 'Zdravnik'):
            if (Zdravnik.objects.filter(email=mail).exists() ):
                #print "already exists"
                #traceback.print_exc()
                respons = JSONResponse({"error": "User with this email already exists"})
                respons.status_code = 400;  # Bad request
                return respons
            else:
                validate_password(password=passw)
                IsAlphanumericPasswordValidator().validate(passw)
                # check only ime - same as in login
                if( ime != "" ):
                    zdr = Zdravnik.objects.create_user(username=mail, email=mail, password=passw, prosta_mesta=prostaMesta,
                            sifra_id=sifrantReg.pk, sprejema_paciente=sprejemaPac, ambulanta_id=ambul_id, role_id=2, is_staff=0,
                            ime=ime, priimek=prii,naziv=naziv, tip=tip, ustanova_id=ustan_id, telefon=stev )
                    # medicinske_sestre=sestra_id,
                else:
                    zdr = Zdravnik.objects.create_user(username=mail, email=mail, password=passw, prosta_mesta=10,
                        sifra_id=sifrantReg.pk, sprejema_paciente=1, ambulanta_id=ambul_id, role_id=2, is_staff=0 )

                #  set sifra to is_used
                sifrantReg.is_used = True
                sifrantReg.save()
                # zdravnik with sifra created -> add it's nurses to it
                for nurse in sestreUsernames:
                    zdr.medicinske_sestre.add(Osebje.objects.get(email=nurse['username']))

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
                IsAlphanumericPasswordValidator().validate(passw)
                if ime != "":
                    medSest = Osebje.objects.create_user(username=mail, email=mail, is_staff=0, ime=ime,
                              priimek=prii, sifra_id=sifrantReg.pk, telefon=stev, password=passw, role_id=3,
                              ustanova_id=ustan_id )
                else:
                    medSest = Osebje.objects.create_user(username=mail, email=mail, is_staff=0, password=passw,
                                sifra_id=sifrantReg.pk, role_id=3 )

                #  set sifra to is_used
                sifrantReg.is_used = True
                sifrantReg.save()

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
def urejanjeZdravilAdmin(request, format=None):

    tabelaAdded = request.data['tabelaDodanih']
    tabelaDeleted = request.data['tabelaZbrisanih']
    izbranaBolezen = request.data['izbranaBolezen']['id']
    print izbranaBolezen

    # dodaj zdravilo
    for a in tabelaAdded:
        try:
            bolezniZdravila = BolezniZdravila.objects.get(bolezni_id=izbranaBolezen, zdravilo_id=a['id'])
            bolezniZdravila.zbrisano = False
            bolezniZdravila.save()

        except ObjectDoesNotExist:
            BolezniZdravila.objects.create(bolezni_id=izbranaBolezen, zdravilo_id=a['id'], zbrisano=False)

    # brisi zdravilo
    for d in tabelaDeleted:
        try:
            bolezniZdravila = BolezniZdravila.objects.get(bolezni_id=izbranaBolezen, zdravilo_id=d['zdravilo']['id'])
        except ObjectDoesNotExist:
            continue
        bolezniZdravila.zbrisano=True
        bolezniZdravila.save()
    try:
        bolezen = Bolezni.objects.get(id=izbranaBolezen)
    except ObjectDoesNotExist:
        pass
    tmp = BolezniZdravila.objects.filter(bolezni_id=bolezen.id)
    bolezen.deleted = BolezniZdravilaSerializer(tmp, many=True, context={'request': request}).data
    serializer = BolezniSerializer(bolezen, context={'request': request})

    return  Response(serializer.data)


@api_view(['POST'])
def ustvariPregled(request, format=None):
    """
    Create PREGLED
    """
    try:

        datum_pregleda = request.data['datum_pregleda']
        zdravnikID = request.data['zdravnik']
        uporabnikID = request.data['uporabnik']
        #meritve = request.data.get('meritve', None)
        izmerjena_vrednost_meritve = request.data.get('vrednost_meritve', [])
        bolezen = request.data.get('bolezen', [])
        zdravilo = request.data.get('zdravilo', [])
        dieta = request.data.get('dieta', [])
        #datum_naslednjega = request.data['datum_naslednjega']
        opombe = request.data['opombe']
        zdravnik = Zdravnik.objects.get(id=zdravnikID)
        uporabnik = Uporabnik.objects.get(id=uporabnikID)
        pregled = Pregled.objects.create(opombe=opombe,
                                         datum=datum_pregleda,
                                         zdravnik=zdravnik,
                                         datum_naslednjega=datum_pregleda,
                                         uporabnik=uporabnik)


        # pohendlaj diete
        for d in dieta:
            pregled.dieta.add(Dieta.objects.get(naziv=d["naziv"], sifra=d["sifra"]))
            #dodaj se uporabniku
            uporabnik.dieta.add(Dieta.objects.get(naziv=d["naziv"], sifra=d["sifra"]))


        # pohendlaj bolezni
        for b in bolezen:
            # pridobi bolezen
            trenutnaBolezen = Bolezni.objects.get(id=b['id'])
            # dodaj pregeldu
            pregled.bolezen.add(trenutnaBolezen)
            # dodaj uporabniku
            uporabnik.bolezni.add(trenutnaBolezen)


        #pohendlaj zdravila
        for z in zdravilo:
            pregled.zdravilo.add(Zdravilo.objects.get(zdravilo=z["zdravilo"]))
            #shranim se v uporabnika
            uporabnik.zdravila.add(Zdravilo.objects.get(zdravilo=z["zdravilo"]))


        #pohendlaj meritve
        for v in izmerjena_vrednost_meritve:
            vrednostMeritev = VrednostiMeritev.objects.get(id=v["tip"])
            meritve = Meritev.objects.create(tip_meritve=vrednostMeritev,
                                             vrednost_meritve=v["vrednost"],
                                             datum=datum_pregleda,
                                             uporabnik_id=uporabnikID,
                                             pregled=pregled)

        return Response()

    except IntegrityError as e:
        #Exception raised when the relational integrity of the database
        #is affected, e.g. a foreign key check fails, duplicate key, etc.

        traceback.print_exc()
        respons = JSONResponse({"error": "{'type' : 'Integrity error'}"})
        respons.status_code = 422
        return respons

    except Exception as ex:
        print (ex)
        traceback.print_exc()
        response = JSONResponse({"error" : ex})
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
        if request.data.get('oskrbovanec', "") != "":
            mail = request.data['email']
            password = 'pbkdf2_sha256$24000$57Yuhx3LYR5c$/Mnf5vRoMky/AL38imTepBSZunwzNcs74qz5r4SZtsE=';
        else:
            mail = request.data['email']
            password = request.data['password']

         #opcijska polja
        ime = request.data.get('ime', "")
        priimek = request.data.get('priimek', "")
        st_zzzs = request.data.get('zdravstvenaSt', 0000)
        spol = request.data.get('spol', "")
        krvnaSkupina = request.data.get('krvnaSkupina', "")
        kraj_rojstva = request.data.get('krajRojstva', "")
        naslov = request.data.get('naslov', "")

        if ime != "":
            try:
                [y,m,d] = ((request.data.get('datumRojstva', [2000, 20, 12])).split("T")[0]).split("-")
                tmpD = int(d)
                tmpD = tmpD + 1
                # dan pride 10, na fieldu pa je 11 (zacne z 0 al neki)
                datum_rojstva = datetime.date(int(y), int(m), int(tmpD) )
                print (datum_rojstva)
            except ValueError as date_ve:
                datum_rojstva = datetime.date(2000, 20, 12)


        if (Uporabnik.objects.filter(email=mail).exists() ):
            respons = JSONResponse({"error": "User with this email already exists"})
            respons.status_code = 400;  # Bad request
            return respons
        else:
            validate_password(password=password)
            IsAlphanumericPasswordValidator().validate(password)
            # check only ime - same as in login
            if( ime != "" ):
                pacient = Uporabnik.objects.create_user(username=mail, email=mail, password=password, role_id="4", is_active=False,
                            ime=ime, priimek=priimek, st_zzzs=st_zzzs, spol=spol, krvna_skupina=krvnaSkupina,
                            datum_rojstva=datum_rojstva, kraj_rojstva=kraj_rojstva, naslov=naslov)
            else:
                pacient = Uporabnik.objects.create_user(username=mail, email=mail,
                            password=password, datum_rojstva=datetime.date(2008, 3, 12), role_id="4", is_active=False)


            #posljes mail za aktivacijo
            if request.data.get('oskrbovanec', "") == "":
                send_mail('Aktivacija eZdravstvo', 'Uspesno ste se registrirali na portal eZdravstvo. Za aktivacijo profila, kliknite na spodnji naslov: \n\n\n' +
                      settings.API_URL+'/activate/?email='+mail, 'ezdravstvo.tpo7@gmail.com', [mail], fail_silently=False)

            # ce je okrbovanec ne posljes maila
            if request.data.get('oskrbovanec', "") != "":
                # pridobi lastnika
                lastnik = Uporabnik.objects.get(id = request.data['lastnik'])

                # kontaktna oseba == lastnik
                kontaktna = KontaktnaOseba(ime=lastnik.ime,
                                          priimek=lastnik.priimek,
                                          naslov=lastnik.naslov,
                                          posta_id=lastnik.posta_id,
                                          sorodstveno_razmerje='Sorodnik',
                                          telefon=lastnik.telefon)
                kontaktna.save()

                # dodaj kontaktno osebo oskrbovancu
                pacient.kontaktna_oseba_id = kontaktna.id
                pacient.save()

                # oskrbovanca dodaj lasntiku
                lastnik.oskrbovanci.add(pacient.pk)
                lastnik.save()

            respons = JSONResponse({"success": "function : {'user created':'Pacient'}"})
            respons.status_code = 201
            return respons



        respons = JSONResponse({"success": "function : {'user created':'Pacient'}"})
        respons.status_code = 201
        respons.pacient = pacient;
        return respons

    except ValidationError as ve:
        print (ve)
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
        print (ve)
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
    

@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def changeZdravnik(request, format=None):
    """
    Change Pacient's zdravnik
    """
    try: 
        try: 
            zdravnikId = request.data['zdravnik'];
        except KeyError:
            zdravnikId = -2
        try:
            zobozdravnikId = request.data['zobozdravnik'];
        except KeyError:
            zobozdravnikId = -2
        try: 
            id = request.META['HTTP_PACIENT'];
        except KeyError:
            id = request.user.id
            
        try:
            uporabnik = Uporabnik.objects.get(id = id)
            try:
                rels = UporabnikZdravnik.objects.filter(uporabnik = uporabnik)
            except ObjectDoesNotExist:  # There is no relations
               pass 
       
            #### Zdravnik
            try:
                if zdravnikId > -1:
                    zdravnik = Zdravnik.objects.get(id = zdravnikId)
                    if zdravnik.sprejema_paciente != True or zdravnik.prosta_mesta <= 0:
                        response = JSONResponse({"error": "Zdravnik " + zdravnik.ime + " " + 
                            zdravnik.priimek + " ne sprejema vec pacientov"})
                        response.status_code = 403
                        return response

            except ObjectDoesNotExist:  # Zdravnik doesn't exist
                print( "No such zdravnik" )
                zdravnikId = -2
                
            #### Zobozdravnik
            try:
                if zobozdravnikId > -1:
                    zobozdravnik = Zdravnik.objects.get(id = zobozdravnikId)
                    if zobozdravnik.sprejema_paciente != True or zobozdravnik.prosta_mesta <= 0:
                        response = JSONResponse({"error": "Zdravnik " + zobozdravnik.ime + " " + 
                            zobozdravnik.priimek + " ne sprejema vec pacientov"})
                        response.status_code = 403
                        return response
                        
            except ObjectDoesNotExist:  # Zdravnik doesn't exist
                print( "No such zobozdravnik" )
                zobozdravnikId = -2
               
            else:  
                sameZdravnik = False #So we don't add the same relation
                sameZobozdravnik = False 
                responseZdravniki = {}
                
                # Loop over relations and modify/delete if necessary
                for r in rels:  #Replace relations
                    print (r)
                    if r.zdravnik.id == zobozdravnikId:
                        sameZobozdravnik = True
                    if r.zdravnik.id == zdravnikId:
                        sameZdravnik = True
                        
                    if r.zdravnik.tip == "zobozdravnik" and zobozdravnikId > -2 and r.zdravnik.id != zobozdravnikId: # = error, do not change
                        r.delete()
                        r.zdravnik.prosta_mesta += 1
                        r.zdravnik.save()
                        
                    elif r.zdravnik.tip != "zobozdravnik" and zdravnikId > -2 and r.zdravnik.id != zdravnikId: # = error, do not change
                        r.delete()
                        r.zdravnik.prosta_mesta += 1
                        r.zdravnik.save()
                        
                if zobozdravnikId > -1 and sameZobozdravnik == False: #Changing zobozdravnik
                    UporabnikZdravnik.objects.create(uporabnik_id = id, zdravnik_id = zobozdravnikId)
                    zobozdravnik.prosta_mesta -= 1
                    zobozdravnik.save()
                    serializer = ZdravnikSerializer(zobozdravnik, context={'request': request})
                    responseZdravniki['zobozdravnik'] = serializer.data
                if zdravnikId > -1 and sameZdravnik == False: #Changing zobozdravnik
                    UporabnikZdravnik.objects.create(uporabnik_id = id, zdravnik_id = zdravnikId)
                    zdravnik.prosta_mesta -= 1
                    zdravnik.save()
                    serializer = ZdravnikSerializer(zdravnik, context={'request': request})
                    responseZdravniki['zdravnik'] = serializer.data
            return JSONResponse(responseZdravniki)
        except ObjectDoesNotExist:
            response = JSONResponse({"error": "User does not exist"})
            response.status_code = 400
            return response
    except Exception as ex:
        traceback.print_exc()
        response = JSONResponse({"error":"Unknown error"})
        response.status_code = 500; # Bad request
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
                    IsAlphanumericPasswordValidator().validate(newpass)
                    user.set_password(newpass)
                    user.save()
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


class KontaktnaOsebaViewSet(viewsets.ModelViewSet):
    queryset = KontaktnaOseba.objects.all()
    serializer_class = KontaktnaOsebaSerializer

@api_view(['POST'])
def forgotPassword(request, format=None):
    try:
        email = request.data.get('email')
        token = request.data.get('token','')
        if(token != ''): #Setting new password
            try:
                if token == hashlib.md5(email).hexdigest(): #Just for show
                    password = request.data['password']
                    user = User.objects.get(email=email)
                    validate_password(password=password)
                    IsAlphanumericPasswordValidator().validate(password)
                    user.set_password(password)
                    user.save()
                    return Response()
                else:
                    response = JSONResponse({"error":"Neveljaven token."})
                    response.status_code = 400; # Bad request
                    return response

            except (KeyError, ValidationError):
                response = JSONResponse({"error":"Neveljavno geslo."})
                response.status_code = 400; # Bad request
                return response
            except ObjectDoesNotExist as e:
                response = JSONResponse({"error":"Ne najdem uporabnika s tem e-naslovom"})
                response.status_code = 400; # Bad request
                return response


        else:   #Requesting new mail
            try:
                user = User.objects.get(email=email)
                send_mail('Pozabljeno geslo', 'Vase geslo lahko spremenite na spodnjem naslovu: \n\n' + 
                        settings.FE_URL + '/#/pozabljenoGeslo?email=' + email +'&token=' + hashlib.md5(email).hexdigest(),
                        'ezdravstvo.tpo7@gmail.com', [email], fail_silently=False)
                return Response()

            except KeyError as e:
                response = JSONResponse({"error":"Email je obvezen"})
                response.status_code = 400; # Bad request
                return response

            except ObjectDoesNotExist as e:
                response = JSONResponse({"error":"Ne najdem uporabnika s tem e-naslovom"})
                response.status_code = 400; # Bad request
                return response

    except Exception as e:
        traceback.print_exc()
        response = JSONResponse({"error":"Neznana napaka"})
        response.status_code = 500; # Bad request
        return response


# CLANKI
class ClanekBolezniViewSet(viewsets.ModelViewSet):
    queryset = ClanekBolezni.objects.all()
    serializer_class = ClanekBolezniSerializer


# CLANKI
class NavodilaZdravilaViewSet(viewsets.ModelViewSet):
    queryset = NavodilaZdravila.objects.all()
    serializer_class = NavodilaZdravilaSerializer
