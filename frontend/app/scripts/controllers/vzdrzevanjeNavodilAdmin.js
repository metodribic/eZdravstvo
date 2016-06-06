/**
 * Created by jk on 03/06/2016.
 */

angular.module('tpo')
    .controller('vzdrzevanjeNavodilAdmin', ['$scope', '$state', 'Uporabniki', 'BolezniSeznam', 'ZdravilaSeznam', 'DieteSeznam',
        'Zdravila', 'UrejanjeZdravilAdmin', '$resource', '$rootScope', 'AuthService', 'Notification', 'BolezniBrisiClanek',
        function ($scope, $state, Uporabniki, BolezniSeznam, ZdravilaSeznam, DieteSeznam,
                  Zdravila, UrejanjeZdravilAdmin, $resource, $rootScope, AuthService, Notification, BolezniBrisiClanek) {



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
                //console.log(response);
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
            })

            /*FUNKCIJE*/

            $scope.izberiBolezen = function (bolezen) {
                $scope.clankiBolezni = bolezen;
                console.log(bolezen);
            }
            
            $scope.odstraniClanek=function (clanek) {
                console.log(clanek);
                bolezen = $scope.clankiBolezni[0].id
                clanek = clanek.id
                BolezniBrisiClanek.delete({data: clanek, bolezen: bolezen}).$promise.then(function (response) {
                    console.log(response);
                });

                /*
                req = clanek;
                req.delete(function (response) {
                    console.log(response);
                });
                */
            }



            function responseFailedHandler (servFail ){
                console.log(servFail);
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

