'use strict()';

angular.module('tpo')
  .controller('MeritveCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification', function ($scope, AuthService, $state, $rootScope, Meritve, Notification) {
    Meritve.query({uporabnikId: $rootScope.uporabnik.id}).$promise.then(function(response){
      $scope.meritve = response;
    });

    // $scope.meritev_normalna = function(input){
    //   if(input.tip_meritve.normalno_min <= input.vrednost_meritve && input.tip_meritve.normalno_max >= input.vrednost_meritve){
    //     console.log('red-meritev');
    //     return "red-meritev";
    //   }
    // };

    $scope.deleteMeritev = function(id){
      Meritve.delete({meritevId: id}).$promise.then(function(response){
        Notification.success('Meritev uspešno izbrisana!');
        $state.go($state.current, {}, {reload: true});
      });
    };

  }]);
