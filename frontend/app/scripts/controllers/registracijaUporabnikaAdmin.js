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
        
        $scope.visibleAlertFail = false;
        $scope.visibleAlertSucc = false;

        $scope.red = false;
        $scope.besedZaUpor = "";
        $scope.extraInfo = "";

        var mojScope = $scope;


        $scope.showSelectValue = function(mojSelect) {
            console.log(mojSelect);
        }

        $scope.uporabnik = new Uporabniki();
        $scope.shraniU = function (){

            $scope.besedZaUpor = "";
            $scope.extraInfo = "";

            $scope.uporabnik.username = $scope.uporabnik.email;

            console.log($scope.uporabnik.email);
            console.log($scope.uporabnik.password);
            console.log($scope.mojSelect);
            console.log($scope.uporabnik.ime);
            console.log($scope.uporabnik.priimek);
            console.log($scope.uporabnik.sifra);


            var n = new RegistracijaUporAdmin();
            n.email = $scope.uporabnik.email;
            n.username = $scope.uporabnik.username;
            n.password = $scope.uporabnik.password;
            n.role = $scope.mojSelect;

            n.ime = $scope.uporabnik.ime;

            // check it?
            if( angular.isUndefined(n.ime) || n.ime == null){
                n.ime = "";
            }else{
                // check if string
                if( ! (/^[a-zA-Z]{3,21}$/.test(n.ime)) && n.ime != "" ){
                    // invalid name
                    $scope.extraInfo += "Ime lahko ima samo črke, vsaj 3, največ 21.\n";
                }
            }
            n.priimek = $scope.uporabnik.priimek;
            if( angular.isUndefined(n.priimek) || n.priimek == null){
                n.priimek = "";
            }else{
                 if( ! (/^[a-zA-Z]{3,21}$/.test(n.priimek)) && n.priimek != "" ){
                    // invalid name
                    $scope.extraInfo += "Priimek lahko ima samo črke, vsaj 3, največ 21.\n";
                }
            }
            n.sifra = $scope.uporabnik.sifra;
            if( angular.isUndefined(n.sifra) || n.sifra == null){
                n.sifra = "";
            }else{
                // check if string
                if( ! (/^[0-9]{5,11}$/.test(n.sifra)) && n.sifra != "" ){   //
                    // not valid num
                    $scope.extraInfo += "Šifra lahko ima samo številke, vsaj 5, največ 11.\n";
                }
            }
            if( $scope.extraInfo === "" ){
                // save user & wait for response
                n.$save( function(succ){
                    if( succ.success === "function : {'user created':'Zdravnik'}"
                        || succ.success === "function : {'user created':'Medicinska sestra'}" ){
                        //alert("USER CREATED!");

                        mojScope.visibleAlert = false;
                        //$scope.red = false;
                        // clear fields
                        $scope.besedZaUpor = "Uporabnik "+$scope.uporabnik.username+" uspešno ustvarjen.";

                        $scope.uporabnik.email="";
                        $scope.uporabnik.username="";
                        $scope.uporabnik.password="";
                        $scope.mojSelect ="Zdravnik";
                        $scope.uporabnik.ime = "";
                        $scope.uporabnik.priimek = "";
                        $scope.uporabnik.sifra = "";

                        $scope.visibleAlertFail = false;
                        $scope.visibleAlertSucc = true;
                    }

                }, function (err) {
                    console.log(err.data.error);
                    if(err.data.error === "User with this email already exists"){
                        //alert("User already exists!");
                        $scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";

                    }else{
                        // POPRAVI - GLEJ KAJ JE NAROBE, opazil samo pri duplicate entry
                        $scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";
                        //$scope.besedZaUpor = "Prišlo je do napake, ponovno preglejte vnosna polja.";
                    }
                    mojScope.visibleAlert = true;
                    $scope.visibleAlertFail = true;
                    $scope.visibleAlertSucc = false;
                });
            }else{
                // display error?
                mojScope.visibleAlert = true;

                $scope.visibleAlertFail = true;
                $scope.visibleAlertSucc = false;
            }

        };


        // catch server responses or we

    }]);


