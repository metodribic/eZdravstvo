'use strict()';

angular.module('tpo')
 .controller('IndexCtrl', ['$scope', 'Uporabniki',function ($scope, Uporabniki) {
   $scope.ustvariOskrbovanca = function(){
     console.log('dodaj Oskrbovanca');
   };
 }]);
