/**
 * Created by jk on 03/06/2016.
 */

angular.module('tpo')
    .controller('vzdrzevanjeNavodilAdmin', ['$scope', '$state', 'Uporabniki', 'BolezniSeznam', 'ZdravilaSeznam', 'DieteSeznam',
        'Zdravila', 'UrejanjeZdravilAdmin', '$resource', '$rootScope', 'AuthService', 'Notification', 'BrisiBolezniClanek','DodajBolezniClanek',
        function ($scope, $state, Uporabniki, BolezniSeznam, ZdravilaSeznam, DieteSeznam,
                  Zdravila, UrejanjeZdravilAdmin, $resource, $rootScope, AuthService, Notification, BrisiBolezniClanek, DodajBolezniClanek) {

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
                // console.log(response);
            });

            //pridobi vsa zdravila za izbiro
            ZdravilaSeznam.query().$promise.then(function(response) {
                $scope.zdravilaSeznam = response;
                //console.log(response);
            });

            //pridobi vse diete za izbiro
            DieteSeznam.query().$promise.then(function (response) {
                $scope.dieteSeznam = response;
                //console.log(response);
            });

            /*FUNKCIJE*/

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

            $scope.izberiBolezen = function (bolezen) {
                $scope.clankiBolezni = bolezen;
            };

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
