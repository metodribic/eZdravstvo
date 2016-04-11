'use strict';

/**
 * Created by Mrak on 5.4.2016.
 * Contorller za registracijo uporabnika, ki jo opravi admin
 *
 * NAVODILA:
 * #1 Kreiranje uporabniškega računa za zdravnika ali medicinsko sestro
Administrator lahko kreira nov uporabniški račun za zdravnika ali medicinsko sestro.
 Za kreiranje uporabniškega računa mora vnesti email naslov (ki potem služi kot uporabniško ime)
 in geslo. Lahko pa vnese tudi osebne podatke (kreira uporabniški profil zdravnika oziroma medicinske sestre).
# Preveri strukturo email naslova.
# Preveri ustreznost gesla (najmanj 8 znakov, vsaj en numeričen)
# Preveri kreiranje uporabniškega računa za zdravnika brez kreiranja uporabniškega profila.
# Preveri kreiranje uporabniškega računa za zdravnika s kreiranjem uporabniškega profila (obstajati mora vsaj nastavek za kreiranje uporabniškega profila).
# Preveri kreiranje uporabniškega računa za medicinsko sestro brez kreiranja uporabniškega profila.
# Preveri kreiranje uporabniškega računa za medicinsko sestro s kreiranjem uporabniškega profila (obstajati mora vsaj nastavek za kreiranje uporabniškega profila).

 */

angular.module('tpo')
  .controller('registracijaUporAdminCtrl', ['$scope','Uporabniki','$resource', function ($scope, Uporabniki, $resource ) {
      // check if username already exists ?
// add uporabnik - ali auth_user ?
      

      $scope.uporabnik = new Uporabniki();
      // spremeni model in tudi tole ! :D
      $scope.uporabnik.date_joined = '2016-9-4';
      $scope.uporabnik.is_active = 1;
      $scope.uporabnik.is_staff = 1;
      $scope.uporabnik.is_superuser = 0;
      $scope.uporabnik.email = '';
      $scope.uporabnik.username = '';
      $scope.uporabnik.password = '';


/*
      $scope.uporabnik = {
        username : '',
        password : ''
      };
*/
    $scope.shraniU = function (  ){

      $scope.uporabnik.username = $scope.uporabnik.email;
      console.log($scope.uporabnik.email);
      console.log($scope.uporabnik.password);
      $scope.uporabnik.$save();

    };


  }]);
