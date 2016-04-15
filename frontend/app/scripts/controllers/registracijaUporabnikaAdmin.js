'use strict';

/**
 * Created by Mrak on 5.4.2016.
 * Contorller za registracijo uporabnika, ki jo opravi admin
 */

angular.module('tpo')
    .controller('registracijaUporAdminCtrl', ['$scope', '$state', 'Uporabniki','$resource','$rootScope','AuthService','RegistracijaUporAdmin',
        function ($scope, $state, Uporabniki, $resource, $rootScope, AuthService, RegistracijaUporAdmin ) {


        /*GET USER FROM LOCAL STORAGE*/
        $scope.uporabnik = AuthService.getCurrentUser();
        /* če ni prijavlen ga dej na login*/
        if(!$scope.uporabnik){
            $state.go("login");
        }

        // Redirect everyone that isnt an Admin
        if( $scope.uporabnik.role.naziv !== "Admin" ){
            $state.go("nadzornaPlosca");
        }

        // dropdown value
        $scope.mojSelect = 'Zdravnik'; // for example
        
        $scope.visibleAlertFail = false;
        $scope.visibleAlertSucc = false;
        $scope.red = false;
        $scope.besedZaUpor = "";
        $scope.extraInfo = "";

        var mojScope = $scope;


        $scope.showSelectValue = function(mojSelect) {
            //console.log(mojSelect);

            // display or hide fields that are custom for Doc&Nurse
        }

        $scope.uporabniki = new Uporabniki();
        $scope.shraniU = function (){

            $scope.besedZaUpor = "";
            $scope.extraInfo = "";

            $scope.uporabniki.username = $scope.uporabniki.email;

            var n = new RegistracijaUporAdmin();
            n.email = $scope.uporabniki.email;
            n.username = $scope.uporabniki.username;
            n.password = $scope.uporabniki.password;
            n.role = $scope.mojSelect;
            n.ime = $scope.uporabniki.ime;

            // check it?
            if( angular.isUndefined(n.ime) || n.ime == null){
                n.ime = "";
            }else{
                // check if string
                if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.ime)) && n.ime != "" ){
                    // invalid name
                    $scope.extraInfo += "Ime lahko ima samo črke, vsaj 3, največ 21.\n";
                }
            }
            n.priimek = $scope.uporabniki.priimek;
            if( angular.isUndefined(n.priimek) || n.priimek == null){
                n.priimek = "";
            }else{
                 if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.priimek)) && n.priimek != "" ){
                    // invalid name
                    $scope.extraInfo += "Priimek lahko ima samo črke, vsaj 3, največ 21.\n";
                }
            }
            n.sifra = $scope.uporabniki.sifra;
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

                        mojScope.visibleAlert = false;
                        // clear fields
                        $scope.besedZaUpor = "Uporabnik "+$scope.uporabniki.username+" uspešno ustvarjen.";

                        $scope.uporabniki.email="";
                        $scope.uporabniki.username="";
                        $scope.uporabniki.password="";
                        $scope.mojSelect ="Zdravnik";
                        $scope.uporabniki.ime = "";
                        $scope.uporabniki.priimek = "";
                        $scope.uporabniki.sifra = "";

                        $scope.visibleAlertFail = false;
                        $scope.visibleAlertSucc = true;
                    }

                }, function (err) {
                    console.log(err.data.error);
                    if(err.data.error === "User with this email already exists"){
                        //alert("User already exists!");
                        $scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";

                    }else if( err.data.error === "WeakPassword" ) {

                        $scope.besedZaUpor = "Izberite boljše geslo! Geslo mora biti dolžine 8, vsaj 1 številko!";
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


