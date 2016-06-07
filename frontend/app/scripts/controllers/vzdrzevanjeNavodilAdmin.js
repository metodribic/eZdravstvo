/**
 * Created by jk on 03/06/2016.
 */

angular.module('tpo')
    .controller('vzdrzevanjeNavodilAdmin', ['$scope', '$state', 'Uporabniki', 'BolezniSeznam', 'ZdravilaSeznam', 'DieteSeznam',
        'Zdravila', 'UrejanjeZdravilAdmin', '$resource', '$rootScope', 'AuthService', 'Notification', 'BrisiBolezniClanek','DodajBolezniClanek',
        'DodajZdraviluClanek', 'BrisiZdraviluClanek', 'DodajDietiClanek', 'BrisiDietiClanek',
        function ($scope, $state, Uporabniki, BolezniSeznam, ZdravilaSeznam, DieteSeznam,
                  Zdravila, UrejanjeZdravilAdmin, $resource, $rootScope, AuthService, Notification, BrisiBolezniClanek, DodajBolezniClanek,
                  DodajZdraviluClanek, BrisiZdraviluClanek, DodajDietiClanek, BrisiDietiClanek) {

            $scope.novClanekBolezen = "";

            /*GET USER FROM LOCAL STORAGE*/
            $scope.uporabnik = AuthService.getCurrentUser();
            /* če ni prijavlen ga dej na login*/
            if(!$scope.uporabnik){
                $state.go("login");
            }

            // Redirect everyone that isn't an Admin
            if( $scope.uporabnik.role.naziv !== "Admin" ){
                $state.go("nadzornaPlosca");
            }


            //pridobi vse bolezni za izbiro
            BolezniSeznam.query().$promise.then(function(response){
                $scope.bolezniSeznam = response;
            });

            //pridobi vsa zdravila za izbiro
            ZdravilaSeznam.query().$promise.then(function(response) {
                $scope.zdravilaSeznam = response;
            });

            //pridobi vse diete za izbiro
            DieteSeznam.query().$promise.then(function (response) {
                $scope.dieteSeznam = response;
            });


            /*FUNKCIJE*/

            //doda clanek bolezni
            $scope.dodajClanekBolezen = function(){
              novClanek = new DodajBolezniClanek();
              novClanek.clanek = $scope.novClanekBolezen;
              novClanek.bolezen = $scope.clankiBolezni.id;
              novClanek.$save(function(response){
                Notification.success('Članek uspešno dodan!');
                $scope.clankiBolezni.clanki.push({'clanek':response.clanek.clanek, 'id': response.clanek.id});
                $scope.novClanekBolezen = "";
              });
            };


            //vrne izbrano bolezen
            $scope.izberiBolezen = function (bolezen) {
                $scope.clankiBolezni = bolezen;
            };


            //odstrani clanek bolezni
            $scope.odstraniClanek=function (clanek) {
                bolezenId = $scope.clankiBolezni.id;
                clanekId = clanek.id;

                BrisiBolezniClanek.delete({data: clanekId, bolezen: bolezenId}).$promise.then(function (response) {
                    Notification.success('Članek uspešno odstranjen');

                    // odstrani clanek iz tabele
                    for(i = 0; i< $scope.clankiBolezni.clanki.length; i++){
                      if($scope.clankiBolezni.clanki[i].id === clanekId){
                        $scope.clankiBolezni.clanki.splice(i, 1);
                      }
                    }
                });
            };


            //dodaj navodilo zdravila
            $scope.dodajClanekZdravilo = function () {
                novClanekZdravilo = new DodajZdraviluClanek();
                novClanekZdravilo.url = $scope.novClanekZdravila;
                novClanekZdravilo.zdravilo = $scope.clankiZdravila.id;

                novClanekZdravilo.$save(function (response) {
                   Notification.success('Navodilo uspešno dodano!');
                    $scope.clankiZdravila.navodila.push({'url':response.navodilo.url, 'id': response.navodilo.id});
                    $scope.novClanekZdravilo = "";
                });
            };

            
            //vrne izbrano zdravilo
            $scope.izberiZdravilo = function (zdravilo) {
                $scope.clankiZdravila = zdravilo;
            };


            //izbrise navodilo zdravila
            $scope.odstraniNavodiloZdravilo=function (navodilo) {
                zdraviloId = $scope.clankiZdravila.id;
                navodiloZdraviloId = navodilo.id;

                BrisiZdraviluClanek.delete({data: navodiloZdraviloId, zdravilo: zdraviloId}).$promise.then(function (response) {
                    Notification.success('Članek uspešno odstranjen');

                    // odstrani clanek iz tabele
                    for(i = 0; i< $scope.clankiZdravila.navodila.length; i++){
                      if($scope.clankiZdravila.navodila[i].id === navodiloZdraviloId){
                        $scope.clankiZdravila.navodila.splice(i, 1);
                      }
                    }
                });
            }

            //doda navodilo dieti
            $scope.dodajClanekDieta = function () {
                novoNavodilo = new DodajDietiClanek();
                novoNavodilo.url = $scope.novClanekDiete;
                novoNavodilo.dieta = $scope.clankiDiete.id;
                novoNavodilo.$save(function(response){
                    Notification.success('Navodilo uspešno dodano!');
                    $scope.clankiDiete.navodila.push({'url':response.navodilo.url, 'id': response.navodilo.id})
                });
            };


            //vrne izbrano dieto
            $scope.izberiDieto = function (dieta) {
                $scope.clankiDiete = dieta;
            };


            //odstrani navodilo diete
            $scope.odstraniNavodilo=function (navodilo) {
                dietaId = $scope.clankiDiete.id;
                navodiloId = navodilo.id;
                BrisiDietiClanek.delete({data: navodiloId, dieta: dietaId}).$promise.then(function (response) {
                    Notification.success('Navodilo uspešno odstranjeno');
                    // odstrani navodilo iz tabele
                    for(i = 0; i< $scope.clankiDiete.navodila.length; i++){
                      if($scope.clankiDiete.navodila[i].id === navodiloId){
                        $scope.clankiDiete.navodila.splice(i, 1);
                      }
                    }
                });
            };


            function responseFailedHandler (servFail ){
                Notification.error({message: servFail});
            }

            function existsInArray(array, key, val) {
                for(var i=0; i<array.length; i++) {
                    if(array[i][key] === val)
                        return i;
                }
                return -1;
            }

        }]);
