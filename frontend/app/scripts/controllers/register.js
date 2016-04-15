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
        var n = new Register();
        n.username = $scope.uporabnik.email;
        n.password = $scope.uporabnik.password;
        n.ime = $scope.uporabnik.ime;
        n.priimek = $scope.uporabnik.priimek;

        n.$save( function (succ) {
            $scope.uporabnik.email="";
            $scope.uporabnik.password="";
            $scope.uporabnik.ime="";
            $scope.uporabnik.priimek="";
        },

         function (error) {
            console.log(ALERTTTTT);
         }
        );
    }
  }]);
