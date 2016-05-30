'use strict()';

angular.module('tpo')
  .controller('UrediVrednostiMeritevCtrl', ['$scope', '$state', '$rootScope','Notification','VrednostiMeritevSeznam',
  function ($scope, $state, $rootScope, Notification,VrednostiMeritevSeznam) {
    $scope.izbranaMeritev = "";
    
    VrednostiMeritevSeznam.query().$promise.then(function(response){
      $scope.vrednosti_meritev = response;
      console.log(response);
    });

    // select meritev tip
    $scope.izberiMeritev = function(item){
      $scope.izbranaMeritev = item;
      $scope.vrednostMeritve = null;
    };
  }]);
