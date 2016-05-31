'use strict()';

angular.module('tpo')
  .controller('MeritveCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','VrednostiMeritevSeznam','$interval', function ($scope, AuthService, $state, $rootScope, Meritve, Notification,VrednostiMeritevSeznam, $interval) {

    $scope.vrednostMeritve = null;
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
    });

    // select meritev tip
    $scope.izberiMeritev = function(item){
      $scope.izbranaMeritev = item;
      $scope.vrednostMeritve = null;
    };

    // reload state
    $scope.reloadState = function(){
      $state.go($state.current, {}, {reload: true});
    };

    $scope.saveMeritev = function(){
      if($scope.izbranaMeritev.tip == 'Krvni pritisk'){
        console.log('Test');
      }
      else{
        var novaMeritev = new Meritve();
        novaMeritev.tip_meritve = $scope.izbranaMeritev;
        novaMeritev.vrednost_meritve = $scope.vrednostMeritve;
        novaMeritev.uporabnik = $rootScope.uporabnik;
        novaMeritev.pregled = null;
        novaMeritev.datum = moment().format("YYYY-MM-DD");
        novaMeritev.$save(function(response){
          console.log(response);
        });
      }

    //   switch($scope.izbranaMeritev.tip) {
    //     case 'Telesna temperatura':
    //         // save telesna temperatura
    //         console.log('Saving telesna temperatura');
    //         break;
    //     case 'Glukoza':
    //         // save glukoza
    //         console.log('Saving glukoza');
    //         break;
    //     case 'ITM':
    //         // save ITM
    //         console.log('Saving itm');
    //         break;
    //     case 'Srčni pritisk':
    //         // save utrip
    //         console.log('Saving utrip');
    //         break;
    //     case 'Krvni pritisk':
    //         // save pritisk
    //         console.log('Saving pritisk + utrip');
    //         break;
    //   }
    };


  }]);
