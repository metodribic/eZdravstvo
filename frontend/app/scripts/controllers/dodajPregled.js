'use strict()';

/* Contorller za dodajanje pregelda */
/*

Zdravnik lahko vnese podatke o pregledu.
Za vsak pregled zdravnik vnese ustrezne podatke, ki so grupirani na enak način kot
v pacientovi nadzorni plošči in obsegajo:
  • podatke o meritvah (rezultate različnih laboratorijskih preiskav),
  • podatke o ugotovljenih boleznih (ena ali več diagnoz),
  • podatke o alergijah,
  • podatke o predpisanih zdravilih,
  • podatke o dietah in tekstovno polje s poljubnim tekstom (opombe ali navodila, ki jih je prejel pacient).
  • Dodana naj bo povezava na naročanje pacienta na pregled (zgodba #28).
  • Vnos podatkov o meritvah naj bo realiziran v skladu z zahtevami zgodbe #22.

# Preveri, da je možen vpis vseh zahtevanih podatkov.
# Preveri, da se vsi vpisani podatki pojavijo v nadzorni plošči zdravnika, pacienta in medicinske sestre.
# Preveri, da se vsi vneseni podatki izpišejo v okviru podrobnega prikaza podatkov o posameznem pregledu (zgodba #17).

*/

angular.module('tpo')
  .controller('DodajPregledCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService','Pregled', 'DodajPregled','Meritve',
    'VrednostiMeritevSeznam', 'Bolezni', 'BolezniSeznam', 'Zdravila', 'ZdravilaSeznam', 'Diete', 'DieteSeznam',
    'ZdravnikoviPacienti','Notification',
    function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled, DodajPregled, Meritve,
              VrednostiMeritevSeznam, Bolezni, BolezniSeznam, Zdravila, ZdravilaSeznam,
              Diete, DieteSeznam, ZdravnikoviPacienti, Notification) {

      var naziv = '';
      var naslednji_pregled = null;


      // Pridobi Zdravnikove paciente
      ZdravnikoviPacienti.query().$promise.then(function(response){
        $scope.pacienti = response;
        //console.log(response);
      });


      // preveri če je prijavljen uporabnik zdravnik
      if($rootScope.uporabnik.role.naziv == 'Zdravnik'){
        // če je strukturiraj njegov naziv, za lepiši izpis
        naziv = ', '+$rootScope.uporabnik.naziv;
      }
      // če ni ga reddirectaj na homepage
      else{
        $state.go('nadzornaPlosca');
        Notification.error({message: 'Za to dejanje niste pooblaščeni!', title: '<b>Napaka!</b>'});
      }

      // formatiraj string za prikaz trneutnega zdravnika
      $scope.trenutniZdravnik = $rootScope.uporabnik.ime +' '+$rootScope.uporabnik.priimek + naziv;

      // pridobi ustrezen datum
      // datum_pregleda = new Date();
        // datum_pregleda = moment();
      $scope.datum_pregleda = moment().format("DD.MM.YYYY");

      //pridobi vse bolezni za izbiro
      BolezniSeznam.query().$promise.then(function(response){
        $scope.bolezniSeznam = response;
        //console.log(response);
      });

      //pridobi vse meritve za izbiro
      VrednostiMeritevSeznam.query().$promise.then(function(response) {
        $scope.vrednosti_meritev = response;
        //console.log(response);
      });

      //pridobi vsa zdravila za izbiro
      ZdravilaSeznam.query().$promise.then(function(response) {
        $scope.zdravila = response;
        //console.log(response);
      });

      //pridobi vse diete za izbiro
      DieteSeznam.query().$promise.then(function(response) {
        $scope.diete = response;
        //console.log(response);
      });



      mojScope = $scope;



      //moj scope, v katerega shranjujem vse kar je v pregledu
      mojScope.pregled = new DodajPregled();


      //funkcija, ki ustvari pregled
      $scope.ustvariPregled=function () {
        $scope.besedZaUpor = "";
        var a = new DodajPregled();

        a.datum_pregleda = moment(mojScope.datum_pregleda, "DD.MM.YYYY").format("YYYY-MM-DD");
        a.zdravnik = $rootScope.uporabnik.id;
        a.uporabnik = mojScope.pregled.uporabnik.id;
        a.meritve = mojScope.pregled.meritve;
        a.vrednost_meritve = "dopolni";
        a.bolezen = mojScope.pregled.bolezen;
        a.zdravilo = mojScope.pregled.zdravilo;
        a.dieta = mojScope.pregled.dieta;
        a.opombe = mojScope.opombe;


        console.log(a.datum);

        //console.log(a.uporabnik.id);
        //a.datum_naslednjega = $scope.datum_naslednjega;

        //shranim pregled in pocakam na response
        a.$save( function(){

            if( userWasCreaterBool( succ.success ) ){
                $scope.besedZaUpor = "Pregled uspešno ustvarjen.";

                // clear fields
                clearPregledFields(mojScope);

                Notification.success({message: $scope.besedZaUpor });
            }

        }, function (err) {
            responseFailedHandler ( $scope, err.data.error );
            // showFailAlert( $scope );
            Notification.error({message: $scope.besedZaUpor });
        });


        console.log(a);
      }

      //ustvari Uproabnika
      $scope.ustvariPacienta = function (izbranPacient) {
        mojScope.pregled.uporabnik = izbranPacient;
      }


        
        
      //ustvari Meritev
      $scope.ustvariMeritev=function (izbranaMeritev) {

            mojScope.prikaziGlukozo = false;
            mojScope.prikaziKrvni = false;
            mojScope.prikaziSrcni = false;
            mojScope.prikaziTeza = false;
            mojScope.prikaziTemperatura = false;


        for (meritev of izbranaMeritev)  {
            if(meritev.tip === "Glukoza") {
                mojScope.prikaziGlukozo = true;
            }else if (meritev.tip === "Krvni pritisk") {
                mojScope.prikaziKrvni = true;
            }else if (meritev.tip === "Srčni pritisk") {
                mojScope.prikaziSrcni = true;
            }else if (meritev.tip === "Teža") {
                mojScope.prikaziTeza = true;
            }else {
                mojScope.prikaziTemperatura = true;
            }
        }
        mojScope.pregled.meritve = izbranaMeritev;
       //console.log(mojScope.pregled.meritve);
        //console.log(m);
      }

      //funkcija za pridobivanje zdravil
      $scope.ustvariBolezen = function (izbraneBolezni) {
        $scope.izbranaZdravila = [];

        //console.log(izbraneBolezni);
        for (bolezen of izbraneBolezni) {
            //console.log(bolezen);
            for (zdravilo of bolezen.zdravilo) {
              //console.log(zdravilo);
                $scope.izbranaZdravila.push(zdravilo);
            }
        }
        
        mojScope.pregled.bolezen = izbraneBolezni;
        mojScope.pregled.zdravilo = $scope.izbranaZdravila;

        //console.log($scope.izbranaZdravila);
      }
      
      //funkcija za pridobivanje diete
      $scope.ustvariDieto = function (izbranaDieta) {
        mojScope.pregled.dieta = izbranaDieta;
        //console.log(d);
      }

      //pobrise oz. ponastavi vse dropdowne in fielde v dodajPregled
      function clearPregledFields( mojScope ){

          mojScope.pregled.uporabnik="";
          mojScope.pregled.meritve="";
          mojScope.pregled.bolezen="";
          mojScope.pregled.zdravilo ="";
          mojScope.pregled.dieta= "";
          mojScope.opombe = "";

          //getDataFromModels();
      };

      function responseFailedHandler ( scope, servFail ){

            console.log(servFail);

          if( servFail === "User with this email already exists"){

              scope.besedZaUpor = "PRDEC";
          }else{
              // POPRAVI - GLEJ KAJ JE NAROBE, opazil samo pri duplicate entry
              scope.besedZaUpor = "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
              //$scope.besedZaUpor = "Prišlo je do napake, ponovno preglejte vnosna polja.";
          }

      };


      //
      // $scope.naslednji_pregled = function(arg){
      //   if(arg === null){
      //     naslednji_pregled = null;
      //   }
      //   else if (arg == 'teden') {
      //     naslednji_pregled = curr.getDate() - curr.getDay()+7;
      //   }
      //   else {
      //     naslednji_pregled = arg;
      //   }
      // };
  }]);
