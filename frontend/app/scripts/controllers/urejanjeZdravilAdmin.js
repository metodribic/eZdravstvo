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


            //funkcija, ki shrani spremembe
            $scope.shraniSpremembe = function () {
                console.log($scope.obstojecaZbrisana);
                req = new UrejanjeZdravilAdmin();
                req.tabelaDodanih = $scope.tabelaDodanih;
                req.tabelaZbrisanih = $scope.obstojecaZbrisana;
                req.izbranaBolezen = $scope.izbranaBolezen;
                console.log(req);
                req.$save(function(response){
                    console.log(response);
                    Notification.success({message: "Zdravila posodobljena." , replaceMessage: true});
                    $scope.izbranaZdravila = response.deleted;
                    $scope.vsaZdr = "";
                    $scope.tabelaDodanih = [];
                    $scope.obstojecaZbrisana = [];
                    //$state.reload();
                }, function (err) {
                    responseFailedHandler ( $scope, err.data.error );
                });
            };


            //funkcija za pridobivanje zdravil
            $scope.ustvariBolezen = function (bolezen) {
                $scope.izbranaZdravila = [];
                mojScope.sprememba.zdravilo = [];
                $scope.izbranaBolezen = bolezen;
                //tukaj dobis stevilo zdravil, ki jih ima bolezen
                //console.log(bolezen.zdravilo.length);

                //Nafilaj zdravila
                for (var i=0; i<bolezen.deleted.length; i++) {
                    // if(bolezen.deleted[i].zbrisano !== true)
                    mojScope.dodajZdravilo(bolezen.deleted[i]);
                }
                console.log($scope.izbranaZdravila);
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

            $scope.dodajZdraviloSelect = function(zdravilo) {
                // console.log(zdravilo);
                if(!mojScope.sprememba.zdravilo)
                    mojScope.sprememba.zdravilo = [];
                console.log(mojScope.sprememba.zdravilo);
                var idx = existsInArray(mojScope.sprememba.zdravilo, 'zdravilo', zdravilo);
                if(idx == -1) {
                    tmp = {
                      'zdravilo': zdravilo
                    };
                    mojScope.sprememba.zdravilo.push(tmp);
                    $scope.izbranaZdravila = mojScope.sprememba.zdravilo;
                    $scope.tabelaDodanih.push(zdravilo);
                }
            };


            $scope.odstraniZdravilo = function(zdravilo) {
                console.log('zdravilo');
                console.log(zdravilo);
                console.log($scope.izbranaZdravila);

                //tukaj dobim vsa izbrana zdravila
                var zdravila = mojScope.sprememba.zdravilo;
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
                    console.log('zdravila');
                    console.log(zdravila);

                    $scope.obstojecaZbrisana.push(zdravila[0]);
                    console.log($scope.obstojecaZbrisana);
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
