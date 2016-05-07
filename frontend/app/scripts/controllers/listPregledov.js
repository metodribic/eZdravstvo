/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controler za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('ListPregledovZdravnikCtrl', ['$scope','PregledZdravnik', function ($scope, PregledZdravnik) {
        //pridobi preglede vseh zdravnikovih pacientov
      
        PregledZdravnik.query().$promise.then(function(response){
        $scope.pregledi = response;
        // console.log($scope.pregledi);
    });
  }]);
