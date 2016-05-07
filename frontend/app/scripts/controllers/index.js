'use strict()';

angular.module('tpo')
 .controller('IndexCtrl', ['$scope', 'RegistracijaPacient', 'Uporabniki',function ($scope, RegistracijaPacient, Uporabniki) {
   $scope.ustvariOskrbovanca = function(){
     console.log('dodaj Oskrbovanca');
   };
 }]);
