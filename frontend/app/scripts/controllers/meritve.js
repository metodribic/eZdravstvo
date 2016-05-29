'use strict()';

angular.module('tpo')
  .controller('MeritveCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','VrednostiMeritevSeznam','$interval', function ($scope, AuthService, $state, $rootScope, Meritve, Notification,VrednostiMeritevSeznam, $interval) {


    // update clock
    $scope.datum = moment().format("DD.MM.YYYY, HH:mm");
    $interval(function () {
      $scope.datum = moment().format("DD.MM.YYYY, HH:mm");
    }, 1000);

    //  get all meritev
    Meritve.query({uporabnikId: $rootScope.uporabnik.id}).$promise.then(function(response){
      $scope.meritve = response;
    });

    // delete meritev
    $scope.deleteMeritev = function(id){
      Meritve.delete({meritevId: id}).$promise.then(function(response){
        Notification.success('Meritev uspešno izbrisana!');
        $scope.reloadState();
      });
    };

    // get all types of meritve
    VrednostiMeritevSeznam.query().$promise.then(function(response) {
      $scope.vrednosti_meritev = response;
      console.log(response);
    });

    // select meritev tip
    $scope.izberiMeritev = function(item){
      $scope.izbranaMeritev = item;
    };

    // reload state
    $scope.reloadState = function(){
      $state.go($state.current, {}, {reload: true});
    };


  }]);
