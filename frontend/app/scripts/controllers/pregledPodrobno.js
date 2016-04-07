/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('PodrobniPregledCtrl', ['$scope','Pregledi', function ($scope, Pregledi) {
    $scope.test = 'Pregledi';
    /* GET pregled */
    Pregledi.get({idpregled:1}).$promise.then(function(response){
      /* shrani pregled v $scope, da lahk dostopaš v view do njega */
      $scope.pregled = response;
    });
  }]);
