/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('ListPregledovCtrl', ['$scope','Pregled', function ($scope, Pregled) {

       /* GET Uporabnik Pregledi */
    Pregled.query().$promise.then(function(response){
      $scope.pregledi = response;
      // console.log($scope.pregledi);
    });
  }]);
