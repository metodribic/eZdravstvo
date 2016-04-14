/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controller za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('registerCtrl', ['$scope', function ($scope) {
    /* GET register */
    $scope.dodajUporabnika=function (uporabnik) {
        console.log(uporabnik);
    }
  }]);
