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
    .controller('registracijaUporAdminCtrl', ['$scope','Uporabniki','$resource','RegistracijaUporAdmin', function ($scope, Uporabniki, $resource, RegistracijaUporAdmin ) {
        // check if username already exists ?
        // add uporabnik - ali auth_user ?

        // dropdown value
        $scope.mojSelect = 'Zdravnik'; // for example
        $scope.visibleAlert = false;
        $scope.besedZaUpor = "neki nezi :D";
        

        $scope.showSelectValue = function(mojSelect) {
            console.log(mojSelect);
        }

        $scope.uporabnik = new Uporabniki();
        $scope.shraniU = function (){

            $scope.uporabnik.username = $scope.uporabnik.email;
            console.log($scope.uporabnik.email);
            console.log($scope.uporabnik.password);
            //$scope.uporabnik.$save();

            var n = new RegistracijaUporAdmin();
            n.email = $scope.uporabnik.email;
            n.username = $scope.uporabnik.username;
            n.password = $scope.uporabnik.password;
            n.role = $scope.mojSelect;

            // save user & wait for response
            n.$save( function(succ){
                if( succ.success === "function : {'user created':'Zdravnik'}"
                    || succ.success === "function : {'user created':'Medicinska sestra'}" ){
                    alert("USER CREATED!");
                    // clear fields
                    $scope.uporabnik.email="";
                    $scope.uporabnik.username="";
                    $scope.uporabnik.password="";
                    $scope.uporabnik.role="Zdravnik";
                }
            }, function (err) {
                console.log(err.data.error);
                if(err.data.error === "User with this email already exists"){
                    alert("User already exists!");
                    $scope.visibleAlert = true;
                }
            });
        };


        // catch server responses or we

    }]);


