/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('ListPregledovCtrl', ['$scope','PreglediList', function ($scope, PreglediList) {
    /* GET pregled */
      PreglediList.get()
    PreglediList.get({idpregled:1}).$promise.then(function(response){
      /* shrani pregled v $scope, da lahk dostopaš v view do njega */
      $scope.pregledList = response;
    });
  }]);
