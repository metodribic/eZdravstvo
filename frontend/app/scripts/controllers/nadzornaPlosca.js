'use strict';

/* Contorller za nadzorno ploščo

 Podatki so grupirani v več skupin:
    osebni podatki, 👍
    podatki o izbranem osebnem zdravniku in zobozdravniku ter njunih medicinskih sestrah, 👍
    podatki o opravljenih pregledih,
    podatki o boleznih,
    podatki o alergijah,
    podatki o dietah,
    podatki o zdravilih,
    podatki o meritvah,
    podatki o naslednjih pregledih,
    možnost naročanja na preglede.
    V primeru velike količine podatkov se izpiše samo nekaj zadnjih/najnovejših/trenutno aktualnih (npr. zadnjih 5 pregledov).
*/

angular.module('tpo')
  .controller('NadzornaPloscaCtrl', ['$scope','Uporabniki', function ($scope, Uporabniki) {
    $scope.test = 'Nadzorna plosca';
    Uporabniki.get({iduporabnik:1}).$promise.then(function(response){
      $scope.uporabnik = response;
    });
  }]);
