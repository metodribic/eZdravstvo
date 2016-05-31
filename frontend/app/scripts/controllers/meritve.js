'use strict()';

angular.module('tpo')
  .controller('MeritveCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','VrednostiMeritevSeznam','$interval', function ($scope, AuthService, $state, $rootScope, Meritve, Notification,VrednostiMeritevSeznam, $interval) {

    $scope.vrednostMeritve = null;
    $scope.vrednostMeritveSistolicni = null;
    $scope.vrednostMeritveDiastolicni = null;
    $scope.vrednostMeritveUtrip = null;
    // update clock
    $scope.datum = moment().format("DD.MM.YYYY, HH:mm");
    $interval(function () {
      $scope.datum = moment().format("DD.MM.YYYY, HH:mm");
    }, 1000);

    //  get all meritev
    Meritve.query({uporabnikId: $rootScope.uporabnik.id}).$promise.then(function(response){
      $scope.meritve = response;
    });

    // get all types of meritve
    VrednostiMeritevSeznam.query().$promise.then(function(response) {
      $scope.vrednosti_meritev = response;

      for (var el in response){
        // tega rabiš posebi, da lahko pri pritisku preveriš če je input v mejah...
        if(response[el].tip === "Srčni utrip"){
          $scope.vrednostiZaUtrip = response[el];
          break;
        }
      }
    });

    // delete meritev
    $scope.deleteMeritev = function(id){
      Meritve.delete({meritevId: id}).$promise.then(function(response){
        Notification.success('Meritev uspešno izbrisana!');
        $scope.reloadState();
      });
    };

    // select meritev tip
    $scope.izberiMeritev = function(item){
      $scope.izbranaMeritev = item;
      $scope.vrednostMeritve = null;
    };

    // reload state
    $scope.reloadState = function(){
      $state.go($state.current, {}, {reload: true});
    };

    // reset form
    $scope.resetForm = function(){
      $scope.vrednostMeritve = null;
      $scope.vrednostMeritveSistolicni = null;
      $scope.vrednostMeritveDiastolicni = null;
      $scope.vrednostMeritveUtrip = null;
    };

    $scope.saveMeritev = function(){
      if($scope.izbranaMeritev === undefined){
        Notification.warning('Najprej izberite tip meritve!');
      }
      else if($scope.izbranaMeritev.tip == 'Krvni pritisk'){

        // first check if all field are filled
        // prvo preveri če so null, potem pa če niso, preveri še če so dolžine inputov daljše kot 0,
        // ker če uporabnik najrpej nekaj vpiše pa potem zbriše ni null, ampak ga vseeno ne smeš spustit naprej
        if($scope.vrednostMeritveSistolicni === null || $scope.vrednostMeritveDiastolicni === null || $scope.vrednostMeritveUtrip === null ||
          $scope.vrednostMeritveSistolicni.length < 0 || $scope.vrednostMeritveDiastolicni.length < 0 || $scope.vrednostMeritveUtrip.length < 0){
          Notification.warning('Za nadaljevanje vnesite vrednosti meritve!');
        }
        // preveri veljavnost vpisanih podatkov
        else if(!checkValidInput()){
          Notification.warning({message: 'Mogoče vrednosti so: <br> pritisk: od <b>'+$scope.izbranaMeritev.nemogoce_min+'</b> do <b>'+$scope.izbranaMeritev.nemogoce_max+'</b><br> utrip: od <b>'+$scope.vrednostiZaUtrip.nemogoce_min+'</b> do <b>'+$scope.vrednostiZaUtrip.nemogoce_max+'</b>', title: '<b>Vrednosti meritve so zunaj dovoljenih vrednosti!</b>'});
        }
        else{
          var pritisk = $scope.vrednostMeritveSistolicni+'/'+$scope.vrednostMeritveDiastolicni;
          console.log(pritisk);
          // TODO: SHRANI pritisk
          // TODO: SHRANI utrip
        }
      }
      else{
        // preveri če je polje vrednost izpoljeno
        if($scope.vrednostMeritve === null || $scope.vrednostMeritve.length === 0){
          Notification.warning('Za nadaljevanje vnesite vrednost meritve!');
        }
        // preveri veljavnost vpisanih podatkov
        else if(!checkValidInput()){
          Notification.warning({message: 'Mogoče vrednosti so od <b>'+$scope.izbranaMeritev.nemogoce_min+'</b> do <b>'+$scope.izbranaMeritev.nemogoce_max+'</b>', title: '<b>Vrednosti meritve so zunaj dovoljenih vrednosti!</b>'});
        }
        // če je potem shrani meritev
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
      }
    };

    // preveri če je vpisana vrednsot znotraj meja
    function checkValidInput(){
      if($scope.izbranaMeritev.tip == 'Krvni pritisk'){
        var defaultMin = parseInt($scope.izbranaMeritev.nemogoce_min);
        var defaultMax = parseInt($scope.izbranaMeritev.nemogoce_max);
        if(parseInt($scope.vrednostMeritveSistolicni) >= defaultMin && parseInt($scope.vrednostMeritveSistolicni) <= defaultMax &&
        parseInt($scope.vrednostMeritveDiastolicni) >= defaultMin && parseInt($scope.vrednostMeritveDiastolicni) <= defaultMax){
          // preveri še utrip
          if(parseInt($scope.vrednostMeritveUtrip) >= parseInt($scope.vrednostiZaUtrip.nemogoce_min) &&
          parseInt($scope.vrednostMeritveUtrip) <= parseInt($scope.vrednostiZaUtrip.nemogoce_max)){
            return true;
          }
        }
        else
          return false;
      }
      else{
        if(parseInt($scope.vrednostMeritve) >= parseInt($scope.izbranaMeritev.nemogoce_min) &&
        parseInt($scope.vrednostMeritve) <= parseInt($scope.izbranaMeritev.nemogoce_max))
          return true;
        else
          return false;
      }
    }


  }]);
