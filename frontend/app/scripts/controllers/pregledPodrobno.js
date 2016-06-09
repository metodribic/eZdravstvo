/**
 * Created by jk on 06/04/2016.
 */
'use strict()';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('PregledPodrobnoCtrl', ['$scope','Pregled', 'Meritve', '$stateParams', 'Uporabniki', 'AuthService', function ($scope, Pregled, Meritve, $stateParams, Uporabniki, AuthService) {

    /* GET pregled */

      var pregledID = $stateParams.id;

      Pregled.get({ pregledId:pregledID}).$promise.then(function(response){
        $scope.pregled = response;
      });

      Meritve.query({pregledId: pregledID}).$promise.then(function(response) {
            $scope.meritve = response;

            // boldaj samo rezultate, holesterol ima zraven še text
            for(i=0; i<$scope.meritve.length; i++) {
                var m = $scope.meritve;
                if(m[i].tip_meritve.tip === "Holesterol") {
                    var vrednosti = m[i].vrednost_meritve.split("/");
                    m[i].vrednost_meritve = "<b>Normalni: " + vrednosti[0] + ", LDL: " + vrednosti[1] + ", HDL:" + vrednosti[2]+'</b>';
                    // m[i].vrednost_meritve = "<b>" + vrednosti[0] + "/" + vrednosti[1] + "/" + vrednosti[2]+'</b> <i>(normalni/LDL/HDL)</i>';
                }
                else {
                  m[i].vrednost_meritve = '<b>' + m[i].vrednost_meritve + '</b>';
                }
            }
      });

      $scope.okrajsaj = function (input, len) {
          if (input.length > len+10)
              return input.substring(0, len) + "...";
          return input;
      };


  }]);
