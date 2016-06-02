'use strict()';

angular.module('tpo')
  .controller('MeritveCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','VrednostiMeritevSeznam','$interval', function ($scope, AuthService, $state, $rootScope, Meritve, Notification,VrednostiMeritevSeznam, $interval) {

    $scope.vrednostMeritve = null;
    $scope.vrednostMeritveSistolicni = null;
    $scope.vrednostMeritveDiastolicni = null;
    $scope.vrednostMeritveUtrip = null;
    $scope.uredi = false;


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

          // TODO: SHRANI pritisk
          var novaMeritev = new Meritve();
          novaMeritev.tip_meritve = $scope.izbranaMeritev;
          novaMeritev.vrednost_meritve = pritisk;
          novaMeritev.uporabnik = $rootScope.uporabnik.id;
          novaMeritev.pregled = null;
          novaMeritev.datum = moment().format("YYYY-MM-DDTHH:mm");
          novaMeritev.$save(function(response){

            novaMeritev.tip_meritve = $scope.vrednostiZaUtrip;
            novaMeritev.vrednost_meritve = $scope.vrednostMeritveUtrip;
            novaMeritev.uporabnik = $rootScope.uporabnik.id;
            novaMeritev.pregled = null;
            novaMeritev.datum = moment().format("YYYY-MM-DDTHH:mm");
            novaMeritev.$save(function(response){
              Notification.success('Meritev uspešno dodana!');
              $scope.reloadState();
            });
          });
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
          novaMeritev.uporabnik = $rootScope.uporabnik.id;
          novaMeritev.pregled = null;
          novaMeritev.datum = moment().format("YYYY-MM-DDTHH:mm");
          novaMeritev.$save(function(response){
            Notification.success('Meritev uspešno dodana!');
            $scope.reloadState();
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
          // console.log(parseInt($scope.vrednostMeritveUtrip) +'>='+ parseInt($scope.vrednostiZaUtrip.nemogoce_min));
          // console.log(parseInt($scope.vrednostMeritveUtrip) +'<='+ parseInt($scope.vrednostiZaUtrip.nemogoce_max));
          if(parseInt($scope.vrednostMeritveUtrip) >= parseInt($scope.vrednostiZaUtrip.nemogoce_min) &&
          parseInt($scope.vrednostMeritveUtrip) <= parseInt($scope.vrednostiZaUtrip.nemogoce_max)){
            return true;
          }
          else{
            return false;
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


    $scope.urediMeritev = function(index, oldMeritev){
      $scope.staraMeritev = oldMeritev;
      var name1 = 'a'+index;
      var name2 = 'b'+index;
      var save = 'shrani'+index;
      var brisi = 'brisi'+index;
      var spremeni = 'spremeni'+index;
      var preklic = 'preklici'+index;

      var element1 = document.getElementById(name1);
      var element2 = document.getElementById(name2);
      var element3 = document.getElementById(save);
      var element4 = document.getElementById(brisi);
      var element5 = document.getElementById(spremeni);
      var element6 = document.getElementById(preklic);

      element1.style.display = 'none';
      element2.style.display = 'inline';
      element2.style="visibility: visible";
      element3.style.display = 'inline';
      element3.style="visibility: visible";
      element4.style.display = 'none';
      element5.style.display = 'none';
      element6.style.display = 'inline';
      element6.style="visibility: visible";
      $scope.uredi = true;
    };

    $scope.prekliciUrejanje = function(index, input){
      var name1 = 'a'+index;
      var name2 = 'b'+index;
      var save = 'shrani'+index;
      var brisi = 'brisi'+index;
      var spremeni = 'spremeni'+index;
      var preklic = 'preklici'+index;

      var element1 = document.getElementById(name1);
      var element2 = document.getElementById(name2);
      var element3 = document.getElementById(save);
      var element4 = document.getElementById(brisi);
      var element5 = document.getElementById(spremeni);
      var element6 = document.getElementById(preklic);

      element1.style.display = 'inline';
      element2.style.display = 'none';
      element2.style="visibility: hidden";
      element3.style.display = 'none';
      element3.style="visibility: hidden";
      element4.style.display = 'inline';
      element5.style.display = 'inline';
      element6.style.display = 'none';
      element6.style="visibility: hidden";
      $scope.uredi = false;
      $scope.reloadState();
    };

    $scope.posodobiMeritev = function(meritev, index){
        meritev.$update({meritevId: meritev.id}, function(response){
          Notification.success('Meritev uspešno posodobljena!');
          $scope.prekliciUrejanje(index);
        });
    };

    $scope.preveriSpremenjenoVrednost = function(input,index){
        console.log(input);
        $scope.izbranaMeritev = input;
        var isOk = false;

        if($scope.izbranaMeritev.tip_meritve.tip == 'Krvni pritisk'){
          var defaultMin = parseInt($scope.izbranaMeritev.tip_meritve.nemogoce_min);
          var defaultMax = parseInt($scope.izbranaMeritev.tip_meritve.nemogoce_max);
          index = $scope.izbranaMeritev.vrednost_meritve.indexOf("/");
          $scope.vrednostMeritveSistolicni = $scope.izbranaMeritev.vrednost_meritve.substring(0,index);
          $scope.vrednostMeritveDiastolicni = $scope.izbranaMeritev.vrednost_meritve.substring(index+1);

          if(parseInt($scope.vrednostMeritveSistolicni) >= defaultMin && parseInt($scope.vrednostMeritveSistolicni) <= defaultMax &&
          parseInt($scope.vrednostMeritveDiastolicni) >= defaultMin && parseInt($scope.vrednostMeritveDiastolicni) <= defaultMax){
            isOk = true;
          }
          else
            isOk = false;
        }
        else{
          if(parseInt($scope.izbranaMeritev.vrednost_meritve) >= parseInt($scope.izbranaMeritev.tip_meritve.nemogoce_min) &&
          parseInt($scope.izbranaMeritev.vrednost_meritve) <= parseInt($scope.izbranaMeritev.tip_meritve.nemogoce_max))
            isOk = true;
          else
            isOk = false;
        }

        if(isOk){
          $scope.posodobiMeritev(input, index);
        }
        else {
          if($scope.izbranaMeritev.tip_meritve.tip == 'Krvni pritisk')
            Notification.warning({message: 'Mogoče vrednosti so: <br> pritisk: od <b>'+$scope.izbranaMeritev.tip_meritve.nemogoce_min+'</b> do <b>'+$scope.izbranaMeritev.tip_meritve.nemogoce_max+'</b><br> utrip: od <b>'+$scope.vrednostiZaUtrip.nemogoce_min+'</b> do <b>'+$scope.vrednostiZaUtrip.nemogoce_max+'</b>', title: '<b>Vrednosti meritve so zunaj dovoljenih vrednosti!</b>'});
          else
            Notification.warning({message: 'Mogoče vrednosti so od <b>'+$scope.izbranaMeritev.tip_meritve.nemogoce_min+'</b> do <b>'+$scope.izbranaMeritev.tip_meritve.nemogoce_max+'</b>', title: '<b>Vrednosti meritve so zunaj dovoljenih vrednosti!</b>'});

        }

    };


  }]);
