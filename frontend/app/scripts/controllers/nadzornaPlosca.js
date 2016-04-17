'use strict()';

/* Contorller za nadzorno ploščo

 Podatki so grupirani v več skupin:
    osebni podatki, 👍
    podatki o izbranem osebnem zdravniku in zobozdravniku ter njunih medicinskih sestrah, 👍
    podatki o opravljenih pregledih, 👍
    podatki o boleznih,👍
    podatki o alergijah,👍
    podatki o dietah,👍
    podatki o zdravilih,👍
    podatki o meritvah, 👍
    podatki o naslednjih pregledih,👍
    možnost naročanja na preglede. TODO:TO SE DOPIŠE, ČE SE IMPLEMENTIRA KASNEJE NAROČANJE
    V primeru velike količine podatkov se izpiše samo nekaj zadnjih/najnovejših/trenutno aktualnih (npr. zadnjih 5 pregledov).
*/

angular.module('tpo')
  .controller('NadzornaPloscaCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService','Pregled','Meritve','Bolezni','Zdravila','Diete', function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled, Meritve, Bolezni, Zdravila, Diete) {

    /*GET USER FROM LOCAL STORAGE*/
    $scope.uporabnik = AuthService.getCurrentUser();
    /* če ni prijavlen ga dej na login*/
    if(!$scope.uporabnik)
      $state.go("login");

  /*
    if( ! $rootScope.uporabnik.is_superuser || angular.isUndefined($rootScope.uporabnik.is_superuser) ){
        // not superuser -> dont show Registracija link
        $scope.isSuperU = true;
    }else{
        $scope.isSuperU = true;
    }
      */

    /* limit for pagination*/
    var pagination_limit = 5;

    /* Loči zasebnega zdravnika ter zobozdravnika */
    $scope.osebniZdravnik = {};
    $scope.osebniZobozdravnik = {};
    console.log($rootScope.uporabnik);
    for(var index in $scope.uporabnik.zdravnik){
     var tmpZdravnik = $scope.uporabnik.zdravnik[index];
     if(tmpZdravnik.tip == 'osebni'){
       $scope.osebniZdravnik = tmpZdravnik;
      }
      if(tmpZdravnik.tip == 'zobozdravnik') {
        $scope.osebniZobozdravnik = tmpZdravnik;
      }
    }

    /* GET Uporabnik Pregledi */
    Pregled.get({limit:  pagination_limit}).$promise.then(function(response){
      $scope.pregledi = response.results;
    });

    /* GET Uporabnik Meritve*/
    Meritve.get({limit: pagination_limit}).$promise.then(function(response){
      $scope.meritve = response.results;
    });

    /* GET Uporabnik Bolezni*/
    Bolezni.get({limit: pagination_limit}).$promise.then(function(response){
      $scope.bolezni = response.results;
    });

    /* GET Uporabnik Zdravila*/
    Zdravila.get({limit: pagination_limit}).$promise.then(function(response){
      $scope.zdravila = response.results;
    });

    /* GET Uporabnik Diete*/
    Diete.get({limit: pagination_limit}).$promise.then(function(response){
      $scope.diete = response.results;
    });

    /* metoda za krajšanje linkov, če so predolgi */
    $scope.okrajsaj = function(input){
      if(input.length > 40){
        return input.substring(0,30)+"...";
      }
      return input;
    };
  }]);
