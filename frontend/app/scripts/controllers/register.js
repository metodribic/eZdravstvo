/**
 * Created by jk on 06/04/2016.
 */
'use strict';

/* Controller za podrobni pogled pregleda*/

angular.module('tpo')
  .controller('registerCtrl', ['$scope', function ($scope) {
    /* GET register */

    //ustvarim praznega uporabnika
    $scope.uporabnik = new Uporabniki();

    //uporabniku dodam ustrezno vsebino
    $scope.dodajUporabnika=function () {
        //console.log(uporabnik);

        //shranis vse dobljene podatke v novega uporabnika
        var n = new Register();

        //obvezna polja
        n.email  =$scope.uporabnik.email;
        n.username = $scope.uporabnik.email;
        n.password = $scope.uporabnik.password;

        //opcijska polja
        n.ime = $scope.uporabnik.ime;
        n.priimek = $scope.uporabnik.priimek;
        n.datumRojstva = $scope.uporabnik.datumRojstva;
        n.krajRojstva = $scope.uporabnik.krajRojstva;
        n.naslov = $scope.uporabnik.naslov;
        n.zdravstvenaSt = $scope.uporabnik.zdravstvenaSt;
        n.spol = $scope.uporabnik.spol;
        n.krvnaSkupina = $scope.uporabnik.krvnaSkupina;


        //shranim v bazo
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
