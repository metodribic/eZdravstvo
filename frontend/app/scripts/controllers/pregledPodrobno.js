/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('PregledPodrobnoCtrl', ['$scope','Pregled', '$stateParams', 'Uporabniki', 'AuthService', function ($scope, Pregled, $stateParams, Uporabniki, AuthService) {

    /* GET pregled */

      var pregledID = $stateParams.id;
      Pregled.get({pregledId:pregledID}).$promise.then(function(response){
      /* shrani pregled v $scope, da lahk dostopaš v view do njega */
        //console.log(response);

        $scope.pregled = response;
          //console.log($scope.pregled);

    });
  }]);
