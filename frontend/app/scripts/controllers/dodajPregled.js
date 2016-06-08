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

      mojScope = $scope;
      $scope.jeZdravnik = {};
      $scope.jeZdravnik.placeholderBes = "Nalagam paciente...";
      $scope.jeZdravnik.nimaP = true;

      // Pridobi Zdravnikove paciente
      ZdravnikoviPacienti.query().$promise.then(function(response){
          $scope.pacienti = response;
          //console.log(response);

          if( $scope.pacienti.length === 0 ){
              mojScope.jeZdravnik.nimaP = true;
              mojScope.jeZdravnik.placeholderBes = "Nimate pacientov...";
          }else{
              mojScope.jeZdravnik.nimaP = false;
              mojScope.jeZdravnik.placeholderBes = "Izberite pacienta...";
          }
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

      //ustvari Uporabnika
      $scope.ustvariPacienta = function (izbranPacient) {
        mojScope.pregled.uporabnik = izbranPacient;
      };


      var mojScope = $scope;

      //moj scope, v katerega shranjujem vse kar je v pregledu
      mojScope.pregled = new DodajPregled();


      //funkcija, ki ustvari pregled
      $scope.ustvariPregled=function () {
        $scope.besedZaUpor = "";
        var a = new DodajPregled();

        a.datum_pregleda = moment(mojScope.datum_pregleda, "DD.MM.YYYY").format("YYYY-MM-DD");
        a.zdravnik = $rootScope.uporabnik.id;
        if(mojScope.pregled.uporabnik)
	        a.uporabnik = mojScope.pregled.uporabnik.id;
        else {
	        responseFailedHandler("Prosim, izberite pacienta!");
	        return;
		    }
        
        a.meritve = mojScope.pregled.meritve;
        a.vrednost_meritve = mojScope.rezultatiMeritev;
        a.bolezen = mojScope.pregled.bolezen;
        a.zdravilo = mojScope.pregled.zdravilo;
        a.dieta = mojScope.pregled.dieta;
        a.opombe = mojScope.opombe;

        //mojScope.rezultatiMeritev = [];
        var shraniPregledBoolean = true;

        for (var i=0; i<$scope.test.length; i++)  {
            var meritev = $scope.test[i];
            if(meritev.tip === "Glukoza") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.glukozaMeritev >= meritev.nemogoce_min && mojScope.glukozaMeritev <= meritev.nemogoce_max) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.glukozaMeritev, tip:1});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za GLUKOZO so napačni!"});
                    break;
                }
            }else if (meritev.tip === "Krvni pritisk") {
                //ce je v mejah normale, ga sprejmi
                if ((mojScope.krvniMeritevSpodnji >= meritev.nemogoce_min &&
			                mojScope.krvniMeritevSpodnji<=meritev.nemogoce_max) &&
		                (mojScope.krvniMeritevZgornji >= meritev.nemogoce_min &&
		                 mojScope.krvniMeritevZgornji <= meritev.nemogoce_max)) {
                     mojScope.rezultatiMeritev.push({vrednost:mojScope.krvniMeritevSpodnji +
	                     "/"+mojScope.krvniMeritevZgornji, tip:2});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za KRVNI PRITISK so napačni!"});
                    break;
                }
            }else if (meritev.tip === "Holesterol") {
                //ce je v mejah normale, ga sprejmi
                var nemogoce_min = meritev.nemogoce_min.split('/');
                var nemogoce_max = meritev.nemogoce_max.split('/');
                if ((mojScope.holesterolNormalen >= nemogoce_min[0] &&
			                mojScope.holesterolNormalen <= nemogoce_max[0]) &&
		                (mojScope.holesterolLDL >= nemogoce_min[1] &&
		                 mojScope.holesterolLDL <= nemogoce_max[1]) &&
		                (mojScope.holesterolHDL >= nemogoce_min[2] &&
		                 mojScope.holesterolHDL <= nemogoce_max[2])) {
                     mojScope.rezultatiMeritev.push({vrednost:mojScope.holesterolNormalen +
	                     "/"+mojScope.holesterolLDL + '/' + mojScope.holesterolHDL, tip:6});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za HOLESTEROL so napačni!"});
                    break;
                }

            }else if (meritev.tip === "Srčni utrip") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.srcniMeritev >= meritev.nemogoce_min && mojScope.srcniMeritev <= meritev.nemogoce_max) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.srcniMeritev, tip:3});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za SRČNI UTRIP so napačni!"});
                    break;
                }
            }else if (meritev.tip === "ITM") {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.tezaMeritev >= meritev.nemogoce_min && mojScope.tezaMeritev <= meritev.nemogoce_max) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.tezaMeritev, tip:5});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za TEŽO(ITM) so napačni!"});
                    break;
                }
            }else {
                //ce je v mejah normale, ga sprejmi
                if (mojScope.tempMeritev >= meritev.nemogoce_min && mojScope.tempMeritev <= meritev.nemogoce_max) {
                    mojScope.rezultatiMeritev.push({vrednost:mojScope.tempMeritev, tip:4});
                }
                //drugace obvesti zdravnika, da ni pravilno vnesel podatkov
                else {
                    shraniPregledBoolean = false;
                    Notification.error({message: "Podatki za TEMPERATURO so napačni!"});
                    break;
                }
            }
        }

        if(shraniPregledBoolean) {
            //shranim pregled in pocakam na response
            a.$save( function(){

                Notification.success({message: "Pregled uspešno ustvarjen." , replaceMessage: true});

                //reloadam stran, da se pobrisejo fieldi
                $state.reload();

            }, function (err) {
                responseFailedHandler ( $scope, err.data.error );
            });
        }
      };

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
            var varname = meritev.tip.toLowerCase().replace(' ', '_').replace('ž', 'z')
	            .replace('š', 's').replace('č', 'c');
            //So we have reference for .enota
            mojScope[varname] = meritev;
            if(meritev.tip === "Glukoza") {
                mojScope.prikaziGlukozo = true;
            }else if (meritev.tip === "Krvni pritisk") {
                mojScope.prikaziKrvni = true;
            }else if (meritev.tip === "Holesterol") {
                mojScope.prikaziHolesterol = true;
            }else if (meritev.tip === "Srčni utrip") {
                mojScope.prikaziSrcni = true;
            }else if (meritev.tip === "ITM") {
                mojScope.prikaziTeza = true;
            }else {
                mojScope.prikaziTemperatura = true;
            }
        }
        mojScope.pregled.meritve = izbranaMeritev;
      };

      //funkcija za pridobivanje zdravil
      $scope.ustvariBolezen = function (bolezen) {
	      //Nafilaj zdravila
	      for (var i=0; i<bolezen.deleted.length; i++) {
              if(bolezen.deleted[i].zbrisano !== true)
		        mojScope.dodajZdravilo(bolezen.deleted[i].zdravilo);
	      }
	      //Dodaj bolezni v pregled.bolezen, da jih na koncu pushas na server
	      if(!mojScope.pregled.bolezen)
		      mojScope.pregled.bolezen = [];
	      mojScope.pregled.bolezen.push(bolezen);
      };

      $scope.odstraniBolezen = function(bolezen) {
	      for (var i=0; i<bolezen.deleted.length; i++) {
		      mojScope.odstraniZdravilo(bolezen.deleted.zdravilo[i]);
	      }
	      var bolezni = mojScope.pregled.bolezen;
	      if(!bolezni)
		      return;
	      var idx = existsInArray(bolezni, 'naziv', bolezen.naziv);
	      if(idx > -1) {
		      bolezni = bolezni.splice(i,1);
		      $scope.izbraneBolezni = bolezni;
	      }
      };

      $scope.dodajZdravilo = function(zdravilo) {
	      if(!mojScope.pregled.zdravilo)
		      mojScope.pregled.zdravilo = [];
	      var idx = existsInArray(mojScope.pregled.zdravilo, 'zdravilo', zdravilo.zdravilo);
	      if(idx == -1) {
		      mojScope.pregled.zdravilo.push(zdravilo);
		      $scope.izbranaZdravila = mojScope.pregled.zdravilo;
	      }
      };


	  $scope.odstraniZdravilo = function(zdravilo) {
		  var zdravila = mojScope.pregled.zdravilo;
		  if(!zdravila)
			  return;
		  var idx = existsInArray(zdravila, 'zdravilo', zdravilo.zdravilo);
		  if(idx > -1) {
			  zdravila = zdravila.splice(idx,1);
			  $scope.izbranaZdravila = zdravila;
	      }
	  };


      //funkcija za pridobivanje diete
      $scope.ustvariDieto = function (izbranaDieta) {
        mojScope.pregled.dieta = izbranaDieta;
      };


      function responseFailedHandler (servFail ){
            console.log(servFail);
            Notification.error({message: servFail});
      }

	  function existsInArray(array, key, val) {
		  for(var i=0; i<array.length; i++) {
			  if(array[i][key] === val)
				  return i;
		  }
		  return -1;
	  }
  }]);
