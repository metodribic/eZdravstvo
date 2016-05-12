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

      //ustvari Uproabnika
      $scope.ustvariPacienta = function (izbranPacient) {
        mojScope.pregled.uporabnik = izbranPacient;
      }


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
        a.vrednost_meritve = mojScope.rezultatiMeritev;
        a.bolezen = mojScope.pregled.bolezen;
        a.zdravilo = mojScope.pregled.zdravilo;
        a.dieta = mojScope.pregled.dieta;
        a.opombe = mojScope.opombe;

        //mojScope.rezultatiMeritev = [];

        for (var i=0; i<$scope.test.length; i++)  {
            var meritev = $scope.test[i];
            if(meritev.tip === "Glukoza") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.glukozaMeritev>= 0 && mojScope.glukozaMeritev<=50) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.glukozaMeritev, tip:1});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    Notification.error({message: "Podatki za GLUKOZO so napačni!"});
                }
            }else if (meritev.tip === "Krvni pritisk") {
                //ce je v mejah normale, ga sprejmi
                if ((mojScope.krvniMeritevSpodnji>= 30 && mojScope.krvniMeritevSpodnji<=300) && (mojScope.krvniMeritevZgornji>= 30 && mojScope.krvniMeritevZgornji<=300)) {
                     mojScope.rezultatiMeritev.push({vrednost:mojScope.krvniMeritevSpodnji+"/"+mojScope.krvniMeritevZgornji, tip:2});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    Notification.error({message: "Podatki za KRVNI PRITISK so napačni!"});
                }
            }else if (meritev.tip === "Srčni pritisk") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.srcniMeritev>= 30 && mojScope.srcniMeritev<=200) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.srcniMeritev, tip:3});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    Notification.error({message: "Podatki za SRČNI PRITISK so napačni!"});
                }
            }else if (meritev.tip === "Teža") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.tezaMeritev>= 15 && mojScope.tezaMeritev<=50) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.tezaMeritev, tip:5});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    Notification.error({message: "Podatki za TEŽO(BMI) so napačni!"});
                }
            }else {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.tempMeritev>= 34 && mojScope.tempMeritev<=42) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.tempMeritev, tip:4});;
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    Notification.error({message: "Podatki za TEMPERATURO so napačni!"});
                }
            }
        }


        //shranim pregled in pocakam na response
        a.$save( function(){

            Notification.success({message: "Pregled uspešno ustvarjen." });

            //reloadam stran, da se pobrisejo fieldi
            $state.reload();

        }, function (err) {
            responseFailedHandler ( $scope, err.data.error );
            // showFailAlert( $scope );
            Notification.error({message: "NEKJE JE NAPAKA!" });
        });
      }

       $scope.test = [];

      //ustvari Meritev
      $scope.ustvariMeritev=function (izbranaMeritev) {

            $scope.test = izbranaMeritev;

            mojScope.prikaziGlukozo = false;
            mojScope.prikaziKrvni = false;
            mojScope.prikaziSrcni = false;
            mojScope.prikaziTeza = false;
            mojScope.prikaziTemperatura = false;

           mojScope.rezultatiMeritev = [];

        for (var i=0; i<izbranaMeritev.length; i++)  {
            var meritev = izbranaMeritev[i];
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
      }


      //funkcija za pridobivanje zdravil
      $scope.ustvariBolezen = function (izbraneBolezni) {
        $scope.izbranaZdravila = [];

        for (var i=0; i<izbraneBolezni.length; i++)  {
            var bolezen = izbraneBolezni[i];
            for (var j=0; j<bolezen.zdravilo.length; j++) {
                for(var k=0; k<bolezen.zdravilo.length; k++)
                    $scope.izbranaZdravila.push(bolezen.zdravilo[i]);
            }
        }
        
        mojScope.pregled.bolezen = izbraneBolezni;
        mojScope.pregled.zdravilo = $scope.izbranaZdravila;

      }
      
      //funkcija za pridobivanje diete
      $scope.ustvariDieto = function (izbranaDieta) {
        mojScope.pregled.dieta = izbranaDieta;
      }


      function responseFailedHandler ( scope, servFail ){

            console.log(servFail);

          if( servFail === "User with this email already exists"){

              scope.besedZaUpor = "NEKAJ JE NAROBE";
          }else{
              // POPRAVI - GLEJ KAJ JE NAROBE, opazil samo pri duplicate entry
              //scope.besedZaUpor = "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
              Notification.error({message: "NEKJE JE NAPAKA!" });
          }

      };
  }]);
