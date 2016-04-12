'use strict';

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
  .controller('NadzornaPloscaCtrl', ['$scope','Uporabniki','$rootScope','AuthService','Pregled','Meritve','Bolezni','Zdravila','Diete', function ($scope, Uporabniki, $rootScope, AuthService, Pregled, Meritve, Bolezni, Zdravila, Diete) {

    var id = AuthService.getCurrentUserId();

    /* GET user */
    Uporabniki.get({iduporabnik: id}).$promise.then(function(response){
       $scope.uporabnik = response;
       $scope.osebniZdravnik = {};
       $scope.osebniZobozdravnik = {};

       /* Loči zasebnega zdravnika ter zobozdravnika */
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
        Pregled.query().$promise.then(function(response){
          $scope.pregledi = response;
        });
        /* GET Uporabnik Meritve*/
        Meritve.query().$promise.then(function(response){
          $scope.meritve = response;
        });

        Bolezni.query().$promise.then(function(response){
          $scope.bolezni = response;
        });

        Zdravila.query().$promise.then(function(response){
          $scope.zdravila = response;
        });

        Diete.query().$promise.then(function(response){
          $scope.diete = response;
        });
     })
     .catch(function(errorCallback){
       if (errorCallback.status == 404) {
         console.log('User not found!');
     }
     });



  }]);
