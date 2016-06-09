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
      });


      $scope.okrajsaj = function (input, len) {
          if (input.length > len+10)
              return input.substring(0, len) + "...";
          return input;
      };

  }]);
