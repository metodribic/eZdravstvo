/**
 * Created by jk on 06/04/2016.
 */
'use strict()';

/* Controller za podrobni pogled pregleda*/



angular.module('tpo')
  .controller('registerCtrl', ['$scope', 'RegistracijaPacient','Notification', '$state', function ($scope, RegistracijaPacient, Notification, $state) {


    $scope.dodajUporabnika=function (user) {
        //console.log(user);

        $scope.besedZaUpor = "";

        var n = new RegistracijaPacient();

        //console.log(n);
        //console.log("*********!!!*");

        //obvezna polja
        n.email  = $scope.user.upIme;
        n.username = $scope.user.upIme;
        n.password = $scope.user.password;

        //opcijska polja
        n.ime = $scope.user.ime;
        n.priimek = $scope.user.priimek;
        n.zdravstvenaSt = $scope.user.st_zzzs;
        n.spol = $scope.user.spol;
        n.krvnaSkupina = $scope.user.krvnaSkupina;
        n.datumRojstva = $scope.user.datum_rojstva;
        n.krajRojstva = $scope.user.kraj_rojstva;
        n.naslov = $scope.user.naslov;


         // save user & wait for response
        n.$save( function(succ){ // could check succ.success
           if( userWasCreaterBool( succ.success ) ){
               $scope.besedZaUpor = "Uporabnik "+ $scope.user.username+" uspešno ustvarjen.";
               /*
               //
               //POSLJI EMAIL ZA AKTIVACIJO UPORABNISKEGA RACUNA
               //
               */
               Notification.success("Registracija uspešna, v poštnem predalu vas čaka aktivacijsko sporočilo.");
               $state.go("login");
               // clear fields
               //clearUporabnikFields($scope);
               //showSuccAlert( $scope );
           }

         }, function (err) {
            if(err.data.error == "WeakPassword"){
              Notification.error("Geslo mora vsebovati najman 8 znakov, od tega vsaj eno številko!");
            }
             responseFailedHandler ( $scope, err.data.error );
             showFailAlert( $scope );
         });

        /*****FUNCTIONS*****/

        //funkcija za pobrisat fielde
        function clearUporabnikFields( scope ){

                //obvezni fieldi
                scope.user.email="";
                scope.user.username="";
                scope.user.password="";

                //opcijski fieldi
                scope.user.ime = "";
                scope.user.priimek = "";
                scope.user.spol = "";
                scope.user.krvna_skupina="";
                scope.user.datum_rojstva = "";
                scope.user.kraj_rojstva = "";
                scope.user.naslov = "";
                scope.user.st_zzzs = "";
        }

        function userWasCreaterBool( servSucc ){
            if( servSucc === "function : {'user created':'Pacient'}"){
                return true;
            }
            return false;
        }

        function responseFailedHandler ( scope, servFail ){

            //console.log(servFail);

            if( servFail === "User with this email already exists"){

                scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";

            }else if( servFail === "WeakPassword" ) {

                scope.besedZaUpor = "Izberite boljše geslo! Geslo mora biti dolžine 8, vsaj 1 številko!";

            }else{
                // POPRAVI - GLEJ KAJ JE NAROBE, opazil samo pri duplicate entry
                scope.besedZaUpor = "Uporabnik s tem email naslovom že obstaja!";
                //$scope.besedZaUpor = "Prišlo je do napake, ponovno preglejte vnosna polja.";
            }

        }

        function showFailAlert( scope ){
            scope.redFields = true;
            scope.visibleAlertFail = true;
            scope.visibleAlertSucc = false;
        }

        function validateFE( scope, n ){

            scope.extraInfo = "";
            if( n.role == "Pacient"){
                //ce ni noben od opcijskih izran
                 if( isVarUndefinedOrEmptyStr(n.ime) &&
                     isVarUndefinedOrEmptyStr(n.priimek) &&
                     isVarUndefinedOrEmptyStr(n.st_zzzs) &&
                     isVarUndefinedOrEmptyStr(n.spol) &&
                     isVarUndefinedOrEmptyStr(n.krvnaSkupina) &&
                     isVarUndefinedOrEmptyStr(n.datum_rojstva) &&
                     isVarUndefinedOrEmptyStr(n.kraj_rojstva) &&
                     isVarUndefinedOrEmptyStr(n.naslov)){
                     // isVarUndefinedOrEmptyStr(n.sprejemaPaciente) -> cant untick once its ticked
                     // no optional field was selected
                     scope.extraInfo = "";
                }else{
                     // atleast one optional field was selected -> problems could accur
                     // string IME & PRIIMEK
                     scope.extraInfo += validateJoinedFields( scope, n);
                }
            }
        }

        //preveri vnosna polja za ime in priimek
        function validateJoinedFields( scope, n ){

            // check ime
            if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.ime)) || angular.isUndefined(n.ime) ){
                // invalid name
                scope.extraInfo += "Ime lahko ima samo črke, vsaj 3, največ 21.\n";
            }

            // check priimek
            if( ! (/^[a-zA-ZčšžČŠŽ]{3,21}$/.test(n.priimek)) || angular.isUndefined(n.priimek) ){
                // invalid name
                scope.extraInfo += "Priimek lahko ima samo črke, vsaj 3, največ 21.\n";
            }
            return scope.extraInfo;
        }
    };
  }]);
