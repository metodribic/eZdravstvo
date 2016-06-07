/**
 * Created by jk on 30/05/2016.
 */


angular.module('tpo')
    .controller('urejanjeZdravilAdminCtrl', ['$scope', '$state', 'Uporabniki', 'BolezniSeznam', 'ZdravilaSeznam', 'Zdravila', 'UrejanjeZdravilAdmin', '$resource', '$rootScope', 'AuthService', 'Notification',
        function ($scope, $state, Uporabniki, BolezniSeznam, ZdravilaSeznam, Zdravila, UrejanjeZdravilAdmin, $resource, $rootScope, AuthService, Notification) {

            var mojScope = $scope;
            $scope.izbranaBolezen = {};

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

            $scope.obstojecaZbrisana = [];
            $scope.tabelaDodanih = [];

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

            req = new UrejanjeZdravilAdmin();

            //funkcija, ki shrani spremembe
            $scope.shraniSpremembe=function () {

                req.tabelaDodanih = $scope.tabelaDodanih;
                req.tabelaZbrisanih = $scope.obstojecaZbrisana;

                req.izbranaBolezen = $scope.izbranaBolezen;

                req.$save( function(response){
                    Notification.success({message: "Zdravila posodobljena." , replaceMessage: true});
                    $scope.izbranaZdravila = response.zdravilo;
                    console.log($scope.izbranaZdravila);
                    $scope.vsaZdr = "";
                    //$state.reload();

                }, function (err) {
                    responseFailedHandler ( $scope, err.data.error );
                });
            }


            //funkcija za pridobivanje zdravil
            $scope.ustvariBolezen = function (bolezen) {
                $scope.izbranaBolezen = bolezen;
                //tukaj dobis stevilo zdravil, ki jih ima bolezen
                //console.log(bolezen.zdravilo.length);

                //Nafilaj zdravila
                for (var i=0; i<bolezen.deleted.length; i++) {
                    if(bolezen.deleted[i].zbrisano !== true)
                        mojScope.dodajZdravilo(bolezen.deleted[i].zdravilo);
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

            /*
            $scope.dodajZdraviloVSA = function(zdravilo) {
                if(!mojScope.sprememba.zdravilo)
                    mojScope.sprememba.zdravilo = [];
                var idx = existsInArray(mojScope.sprememba.zdravilo, 'zdravilo', zdravilo.zdravilo);
                if(idx == -1) {
                    mojScope.tabelaDodanih.push(zdravilo);
                    $scope.izbranaZdravila = mojScope.sprememba.zdravilo;
                }
            };
            */


            $scope.odstraniZdravilo = function(zdravilo) {
                //tukaj dobim vsa izbrana zdravila
                var zdravila = mojScope.sprememba.zdravilo;
                console.log(zdravila);

                //ce so prazna
                if(!zdravila)
                    return;

                //ce obstaja, vrne njegov indeks, drugace vrne -1
                var idx = existsInArray(zdravila, 'zdravilo', zdravilo.zdravilo);

                if(idx > -1) {
                    if(existsInArray($scope.izbranaZdravila, 'zdravilo', zdravila[idx]) == -1) {
                         //console.log($scope.izbrisanaZdravila);
                        zdravila = zdravila.splice(idx,1);
                        $scope.zdravila = zdravila;
                    }

                    //pobrisano zdravilo dodam v tabeloZbrisanih
                    $scope.obstojecaZbrisana.push(zdravila[idx]);
                }
            };


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

