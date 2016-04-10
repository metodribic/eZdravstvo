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
  .controller('NadzornaPloscaCtrl', ['$scope','Uporabniki','$rootScope', function ($scope, Uporabniki, $rootScope) {

    /* GET user */
    // Uporabniki.get({iduporabnik: $rootScope.uporabnik.id}).$promise.then(function(response){
    //   /* shrani uporabnika v $scope, da lahk dostopaš v view do njega */
    //   $scope.uporabnik = response;
    //   console.log($scope.uporabnik);
    // })
    // .catch(function(errorCallback){
    //   if (errorCallback.status == 404) {
    //     console.log('User not found!');
    //   }
    // });

    $scope.osebniZdranik = {};
    $scope.osebniZobozdravnik = {};
    // console.log($rootScope.uporabnik);
    // for(var zdravnik in $rootScope.uporabnik.zdravnik){
    //   if(zdravnik.tip == 'osebni'){
    //     $scope.osebniZdranik = zdravnik;
    //   }
    //   if(zdravnik.tip == 'zobozdravnik') {
    //     $scope.osebniZobozdravnik = zdravnik;
    //   }
    // }

  }]);
