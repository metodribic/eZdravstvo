/**
 * Created by jk on 30/05/2016.
 */


angular.module('tpo')
    .controller('urejanjeZdravilAdminCtrl', ['$scope', '$state', 'Uporabniki', 'BolezniSeznam', 'ZdravilaSeznam', 'UrejanjeZdravilAdmin', '$resource', '$rootScope', 'AuthService', 'Notification',
        function ($scope, $state, Uporabniki, BolezniSeznam, ZdravilaSeznam, UrejanjeZdravilAdmin, $resource, $rootScope, AuthService, Notification) {

            var mojScope = $scope;

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


            //moj scope, v katerega shranjujem vse spremembe
            mojScope.sprememba = new UrejanjeZdravilAdmin();

            //pridobi vse bolezni za izbiro
            BolezniSeznam.query().$promise.then(function(response){
            $scope.bolezniSeznam = response;
            //console.log(response);
            });

            //pridobi vsa zdravila za izbiro
            ZdravilaSeznam.query().$promise.then(function(response) {
            $scope.zdravilaSeznam = response;
            //console.log(response);
            });

            
            /*FUNKCIJE*/

            /*
            //funkcija, ki shrani spremembe
            $scope.shraniSpremembe=function () {
                $scope.besedZaUpor = "";


            }
            */

            //funkcija za pridobivanje zdravil
            $scope.ustvariBolezen = function (bolezen) {
                //Nafilaj zdravila
                for (var i=0; i<bolezen.zdravilo.length; i++) {
                    mojScope.dodajZdravilo(bolezen.zdravilo[i]);
                }
            };


            $scope.dodajZdravilo = function(zdravilo) {
                if(!mojScope.sprememba.zdravilo)
                    mojScope.sprememba.zdravilo = [];
                var idx = existsInArray(mojScope.sprememba.zdravilo, 'zdravilo', zdravilo.zdravilo);
                if(idx == -1) {
                    mojScope.sprememba.zdravilo.push(zdravilo);
                    $scope.izbranaZdravila = mojScope.sprememba.zdravilo;
                }
            };


            $scope.odstraniZdravilo = function(zdravilo) {
                //tukaj dobim vsa izbrana zdravila
                var zdravila = mojScope.sprememba.zdravilo;
                console.log(zdravila);

                //ce niso prazna
                if(!zdravila)
                    return;
                //ce je >-1, potem obstaja v tabeli
                var idx = existsInArray(zdravila, 'zdravilo', zdravilo.zdravilo);
                console.log(idx);
                if(idx > -1) {
                    zdravila = zdravila.splice(idx,1);
                    $scope.zdravila = zdravila;
                }
            };

            function existsInArray(array, key, val) {
                for(var i=0; i<array.length; i++) {
                    if(array[i][key] === val)
                        return i;
                }
                return -1;
            }

        }]);

