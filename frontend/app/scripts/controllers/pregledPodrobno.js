/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controller za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('PregledPodrobnoCtrl', ['$scope','Pregled', function ($scope, Pregled) {
    //$scope.test = 'Pregled';
    /* GET pregled */
    Pregled.get({pregledId:2}).$promise.then(function(response){
      /* shrani pregled v $scope, da lahk dostopaš v view do njega */
        console.log(response);
      $scope.pregled = response;
    });
  }]);
