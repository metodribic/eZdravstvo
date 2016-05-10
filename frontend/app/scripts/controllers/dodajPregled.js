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
  .controller('DodajPregledCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService','Pregled','Meritve',
    'VrednostiMeritevSeznam', 'Bolezni', 'BolezniSeznam', 'Zdravila', 'ZdravilaSeznam', 'Diete', 'DieteSeznam',
    'ZdravnikoviPacienti','Notification',
    function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled, Meritve,
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
      var datum = new Date();
      $scope.datum = datum.getDay() +'.'+ datum.getMonth() +'.' +datum.getFullYear();

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
      mojScope.pregled = new Pregled();


      //funkcija, ki ustvari pregled
      $scope.ustvariPregled=function () {
        var a = new Pregled();

        a.datum = $scope.datum;
        a.zdravnik = $scope.trenutniZdravnik;
        a.uporabnik = mojScope.pregled.uporabnik;
        a.meritve = mojScope.pregled.meritve;
        a.bolezen = mojScope.pregled.bolezen;
        a.zdravilo = mojScope.pregled.zdravilo;
        a.dieta = mojScope.pregled.dieta;
        a.opombe = $scope.opombe;
        //a.datum_naslednjega = $scope.datum_naslednjega;

        mojScope.test = a;

        console.log(a);
      }

      //ustvari Uproabnika
      $scope.ustvariPacienta = function (izbranPacient) {
        mojScope.pregled.uporabnik = izbranPacient;
      }

      //ustvari Meritev
      $scope.ustvariMeritev=function (izbranaMeritev) {

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
