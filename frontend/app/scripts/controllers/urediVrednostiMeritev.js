'use strict()';

angular.module('tpo')
  .controller('UrediVrednostiMeritevCtrl', ['$scope', '$state', '$rootScope','Notification','VrednostiMeritevSeznam','VrednostiMeritev',
  function ($scope, $state, $rootScope, Notification,VrednostiMeritevSeznam, VrednostiMeritev) {
    $scope.izbranaMeritev = "";

    VrednostiMeritevSeznam.query().$promise.then(function(response){
      $scope.vrednosti_meritev = response;
    });

    // select meritev tip
    $scope.izberiMeritev = function(item){
      $scope.izbranaMeritev = item;
      $scope.vrednostMeritve = null;
    };

    // shrani
    $scope.saveMeritev = function(){
      VrednostiMeritev.get({meritevId: $scope.izbranaMeritev.id}).$promise.then(function(response){
        var original = response;
        original = $scope.izbranaMeritev;

        // shrani nove vrednosti
        VrednostiMeritev.update({meritevId: original.id, objekt: original}, function(response){
          Notification.success('Vrednosti meritve '+$scope.izbranaMeritev.tip+ ' so bile uspešno posodobljene!');
        });
      });
    };

    // ponastavi na prvotne vrednoti
    $scope.ponastavi = function(){
      VrednostiMeritev.get({meritevId: $scope.izbranaMeritev.id}).$promise.then(function(response){
        $scope.izbranaMeritev = response;
      });
    };



  }]);
