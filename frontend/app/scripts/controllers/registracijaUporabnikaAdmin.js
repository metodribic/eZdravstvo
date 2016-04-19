'use strict';

/**
 * Created by Mrak on 5.4.2016.
 * Contorller za registracijo uporabnika, ki jo opravi admin
 */

angular.module('tpo')
    .controller('registracijaUporAdminCtrl', ['$scope', '$state', 'Uporabniki','$resource', '$rootScope',
        'AuthService','RegistracijaUporAdmin', 'Osebje', 'Ambulanta', 'Zdravnik', 'Notification',
        function ($scope, $state, Uporabniki, $resource, $rootScope, AuthService,
                  RegistracijaUporAdmin, Osebje, Ambulanta, Zdravnik, Notification ) {
/*
            NotificationProvider.setOptions({
                maxCount:3
            });
*/
            /*GET USER FROM LOCAL STORAGE*/
            $scope.uporabnik = AuthService.getCurrentUser();
            /* če ni prijavlen ga dej na login*/
            if(!$scope.uporabnik){
                $state.go("login");
            }

            // Redirect everyone that isn't an Admin
            if( $scope.uporabnik.role.naziv !== "Admin" ){
                $state.go("nadzornaPlosca");
            }

            // onClick for details button
            $scope.showHideExtras = function (){
                $scope.hiddenElements = !$scope.hiddenElements;
            };
            // init to hide details
            $scope.hiddenElements = true;

            resetOptionalFields( $scope );

            $scope.uporabniki = new Uporabniki();

            /*** Osebje iz baze ***/
            $scope.osebje = new Osebje();
            Osebje.get({limit:  50}).$promise.then(function(response){
                $scope.osebje = response.results;
            });

            /*** Zdravniki iz baze ***/
            $scope.zdravniki = new Zdravnik();
            Zdravnik.get({limit:  50}).$promise.then(function(response){
                $scope.zdravniki = response.results;
            });

            /*** Ambulante iz baze ***/
            $scope.ambulanta = new Ambulanta();
            Ambulanta.get({limit:  50}).$promise.then(function(response){
                $scope.ambulanta = response.results;
            });

            /*** Show fields ***/
            $scope.showSelectValue = function( val ){
                if( val == "Zdravnik"){
                    $scope.jeZdravnik = false;
                }else{
                    $scope.jeZdravnik = true;
                }
            }

            $scope.changedNurse = function( val){
                //console.log(val);
            }

            $scope.shraniU = function (){

                $scope.besedZaUpor = "";
                $scope.extraInfo = "";

                // to display name in msg
                $scope.uporabniki.username = $scope.uporabniki.email;

                var n = new RegistracijaUporAdmin();
                n.email = $scope.uporabniki.email;
                n.username = $scope.uporabniki.email;
                n.password = $scope.uporabniki.password;
                n.role = $scope.mojSelect;
                n.ime = $scope.uporabniki.ime;
                n.priimek = $scope.uporabniki.priimek;
                n.sprejemaPacienteDa = $scope.uporabniki.sprejemaPacienteDa;
                n.sprejemaPacienteNe = $scope.uporabniki.sprejemaPacienteNe;
                n.sifraZdr = $scope.uporabniki.sifraZdravnik;
                n.sifraSes = $scope.uporabniki.sifraSestra;
                n.naziv = $scope.uporabniki.naziv;
                n.tip = $scope.uporabniki.tip;
                
                n.izbranaAmbulanta = $scope.uporabniki.izbranaAmbulanta;
                n.izbranaSestra = $scope.uporabniki.izbranaSestra;
                // med sestra
                n.stevilka = $scope.uporabniki.stevilka;

                console.log(n);
                // validation FE
                validateFE( $scope, n );

                if( $scope.extraInfo === "" ){
                    // save user & wait for response
                    n.$save( function(succ){ // could check succ.success

                        if( userWasCreaterBool( succ.success ) ){
                            $scope.besedZaUpor = "Uporabnik "+ $scope.uporabniki.username+" uspešno ustvarjen.";

                            // clear fields
                            clearUporabnikFields($scope);
                            // showSuccAlert( $scope );
                            Notification.success({message: $scope.besedZaUpor });
                        }

                    }, function (err) {
                        responseFailedHandler ( $scope, err.data.error );
                        // showFailAlert( $scope );
                        Notification.error({message: $scope.besedZaUpor });
                    });
                }else{
                    // display error?
                    //showFailAlert( $scope );
                    Notification.error({message: $scope.extraInfo });

                }

            };

            /* FUNCTIONS */



            function clearUporabnikFields( scope ){

                //scope.mojSelect ="Zdravnik"; // only swaps dropdown, not also which fields to show

                scope.uporabniki.email="";
                scope.uporabniki.username="";
                scope.uporabniki.password="";
                scope.uporabniki.ime = "";
                scope.uporabniki.priimek = "";

                // radio buttons -> no point to change it
                //scope.uporabniki.sprejemaPacienteNe = "";
                //scope.uporabniki.sprejemaPacienteNe = "";

                scope.uporabniki.sifra = "";
                scope.uporabniki.naziv = "";
                scope.uporabniki.tip = "";
                scope.uporabniki.izbranaAmbulanta = "";
                scope.uporabniki.izbranaSestra = "";

                scope.uporabniki.stevilka = "";

                // all fields on false
                scope.errEmail = false;
                scope.errPassw = false;
                scope.errIme = false;
                scope.errPrii = false;
                scope.errSprejemaPac = false;
                //scope.errSifra = false;
                scope.errNaziv = false;
                scope.errTip = false;
                scope.errAmbulanta = false;
                scope.errMedSes = false;
                scope.errStevilka = false;
            };

            function userWasCreaterBool( servSucc ){
                if( servSucc === "function : {'user created':'Zdravnik'}"
                    ||servSucc=== "function : {'user created':'Medicinska sestra'}" ){
                    return true;
                }
                return false;
            };

            function responseFailedHandler ( scope, servFail ){

                console.log(servFail);

                if( servFail === "User with this email already exists"){

                    scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";
                    scope.errEmail = true;

                }else if( servFail === "WeakPassword" ) {

                    scope.besedZaUpor = "Izberite boljše geslo! Geslo mora biti dolžine 8, vsaj 1 številko!";
                    scope.errPassw = true;

                }else{
                    // POPRAVI - GLEJ KAJ JE NAROBE, opazil samo pri duplicate entry
                    scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";
                    //$scope.besedZaUpor = "Prišlo je do napake, ponovno preglejte vnosna polja.";
                }

            };

            function resetOptionalFields( scope ) {
                // dropdown value
                scope.mojSelect = 'Zdravnik';

                //scope.visibleAlertFail = false;
                //scope.visibleAlertSucc = false;
                //scope.red = false;
                scope.besedZaUpor = "";
                scope.extraInfo = "";
            };

            /* Validation FE */

            function isVarUndefinedOrEmptyStr( val ){

                if( val == "" || angular.isUndefined(val) || val == null ){
                    return true;
                }
                return false;
            }

            function validateJoinedFields( scope, n ){

                // check ime
                if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.ime)) || angular.isUndefined(n.ime) ){
                    // invalid name
                    scope.extraInfo += "Ime lahko ima samo črke, vsaj 3, največ 21.\n";
                    scope.errIme = true;
                }else{
                    scope.errIme = false;
                }

                // check priimek
                if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.priimek)) || angular.isUndefined(n.priimek) ){
                    // invalid name
                    scope.extraInfo += "Priimek lahko ima samo črke, vsaj 3, največ 21.\n";
                    scope.errPrii = true;
                }else{
                    scope.errPrii = false;
                }
                return scope.extraInfo;
            }

            function validateFE( scope, n ){

                scope.extraInfo = "";
                if( n.role == "Zdravnik"){
                     if( isVarUndefinedOrEmptyStr(n.ime) && isVarUndefinedOrEmptyStr(n.priimek) &&
                         ! isVarUndefinedOrEmptyStr(n.sifraZdr) &&
                         isVarUndefinedOrEmptyStr(n.naziv) &&
                         isVarUndefinedOrEmptyStr(n.izbranaAmbulanta) && isVarUndefinedOrEmptyStr(n.tip) &&
                         isVarUndefinedOrEmptyStr(n.izbranaSestra) ){
                         // isVarUndefinedOrEmptyStr(n.sprejemaPaciente) -> cant untick once its ticked
                         // no optional field was selected

                         scope.extraInfo = "";

                    }else{

                         // atleast one optional field was selected -> problems could accur
                         // string IME & PRIIMEK
                         scope.extraInfo += validateJoinedFields( scope, n);

                         // bool SPREJEMA PACIENTA
                         if( angular.isUndefined(n.sprejemaPacienteDa) &&  angular.isUndefined(n.sprejemaPacienteNe) ){
                             //scope.sprejemaPaciente = false; // tried to send without submiting (if clears all)
                             scope.extraInfo += "Označite če zdravnik sprejema paciente ali ne!\n";
                             scope.errSprejemaPac = true;
                         }else{
                             scope.errSprejemaPac = false;
                         }

                        // string SIFRA
                         /*
                         if( ! (/^[0-9]{5,13}$/.test(n.sifra)) || angular.isUndefined(n.sifra)  ){
                             // not valid num
                             scope.extraInfo += "Šifra lahko ima samo številke, vsaj 5, največ 13.\n";
                             scope.errSifra = true;
                         }else{
                             scope.errSifra = false;
                         }*/

                         // string NAZIV
                         if( angular.isUndefined(n.naziv) || scope.naziv == "" ){
                             // not valid num
                             scope.extraInfo += "Vnesite naziv.\n";
                             scope.errNaziv = true;
                         }else{
                             scope.errNaziv = false;
                         }

                         // dropdown TIP
                         if( angular.isUndefined(n.tip) ){
                             scope.extraInfo += "Izberite tip zdravnika.\n";
                             scope.errTip = true;
                         }else{
                             scope.errTip = false;
                         }

                         // dropdown AMBULANTA
                         if( angular.isUndefined(n.izbranaAmbulanta) ){
                             scope.extraInfo += "Izberite ambulanto.\n";
                             scope.errAmbulanta = true;
                         }else{
                             scope.errAmbulanta = false;
                         }
                         // dropdown AMBULANTA
                         if( angular.isUndefined(n.izbranaSestra) ){
                             scope.extraInfo += "Izberite medicinsko sestro zdravnika.\n";
                             scope.errMedSes = true;
                         }else{
                             scope.errMedSes = false;
                         }
                    }
                }else{
                    // NURSE

                    if( isVarUndefinedOrEmptyStr(n.ime) && isVarUndefinedOrEmptyStr(n.priimek) &&
                         isVarUndefinedOrEmptyStr(n.stevilka) && ! isVarUndefinedOrEmptyStr(n.sifraSes) ){
                         // no optional field was selected

                         scope.extraInfo = "";

                    }else{
                        // atleast one optional field was selected -> problems could accur
                        // string IME & PRIIMEK
                        scope.extraInfo += validateJoinedFields( scope, n);

                        // int številka
                        if( ! (/^[0-9]{4,9}$/.test(n.stevilka)) || angular.isUndefined(n.stevilka) ){
                            scope.extraInfo += "Šifra lahko ima samo številke, vsaj 4, največ 9.\n";
                            scope.errStevilka = true;
                        }else{
                            scope.errStevilka = false;
                        }

                    }
                }

            }


        }]);

