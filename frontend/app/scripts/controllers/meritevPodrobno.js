'use strict()';

angular.module('tpo')
  .controller('MeritevPodrobnoCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams', function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams) {
    Meritve.get({ meritevId:$stateParams.id}).$promise.then(function(response){
      $scope.meritev = response;
    });
  }]);
