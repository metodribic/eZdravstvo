'use strict()';

angular.module('tpo')
  .controller('dodajMeritevCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams','VrednostiMeritevSeznam',
    function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams, VrednostiMeritevSeznam) {

    VrednostiMeritevSeznam.query().$promise.then(function(response) {
      $scope.vrednosti_meritev = response;
    });

    $scope.meritev = {
      vrednost_meritve: "",
      datum: moment().format("DD.MM.YYYY, hh:mm"),
      tip_meritve: 1
    };

    $scope.ustvariMeritev = function(tmp){
      console.log(tmp);
    };


  }]);
