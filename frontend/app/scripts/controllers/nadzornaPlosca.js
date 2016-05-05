'use strict()';

/* Contorller za nadzorno ploščo

 Podatki so grupirani v več skupin:
    osebni podatki, 👍
    podatki o izbranem osebnem zdravniku in zobozdravniku ter njunih medicinskih sestrah, 👍
    podatki o opravljenih pregledih, 👍
    podatki o boleznih,👍
    podatki o alergijah,👍
    podatki o dietah,👍
    podatki o zdravilih,👍
    podatki o meritvah, 👍
    podatki o naslednjih pregledih,👍
    možnost naročanja na preglede. TODO:TO SE DOPIŠE, ČE SE IMPLEMENTIRA KASNEJE NAROČANJE
    V primeru velike količine podatkov se izpiše samo nekaj zadnjih/najnovejših/trenutno aktualnih (npr. zadnjih 5 pregledov).
*/

angular.module('tpo')
  .controller('NadzornaPloscaCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService',
      'Pregled','Meritve','Bolezni','Zdravila','Diete', 'ZdravnikoviPacienti', '$http',
      function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled,
                Meritve, Bolezni, Zdravila, Diete, ZdravnikoviPacienti, $http ) {

      mojScope = $scope;

      /* če ni prijavlen ga dej na login*/
      if(!$scope.uporabnik)
          $state.go("login");


      $scope.posodobiPacienta = function (uporabnikZdravnika) {

          clearData();

          if( angular.isUndefined(uporabnikZdravnika) || uporabnikZdravnika.ime == "" ){
              // ni pacienta
              mojScope.izbranPacient = false;
          }else {
              mojScope.izbranPacient = true;
              // dobi pacienta ki smo ga izbrali
              mojScope.uporabnik = uporabnikZdravnika;
              mojScope.bolezni = uporabnikZdravnika.bolezni;
              mojScope.diete = uporabnikZdravnika.dieta;
              mojScope.zdravila = uporabnikZdravnika.zdravila;

              console.log(uporabnikZdravnika);
              //$rootScope.changeUser(uporabnikZdravnika, uporabnikZdravnika);  // zamenjejmo userja

        var id = uporabnikZdravnika.id;
        if(!id) {
            //For some stupid reason there is no oskrbovanec id
            id = item.url.substring(item.url.lastIndexOf('/')+1);
            item.id = id;
        }
        //$rootScope.uporabnik = item;
        $http.defaults.headers.common.pacient = id;
              

              Meritve.get({limit:5}).$promise.then(function (response) {
                  mojScope.meritve = response.results;
              });

              Pregled.get({limit:5}).$promise.then(function (response) {
                  mojScope.pregledi = response.results;
              });


              /* Loči zasebnega zdravnika ter zobozdravnika */
              mojScope.osebniZdravnik = {};
              mojScope.osebniZobozdravnik = {};
              for (var index in uporabnikZdravnika.zdravnik) {
                  var tmpZdravnik = uporabnikZdravnika.zdravnik[index];
                  if (tmpZdravnik.tip == 'osebni') {
                      mojScope.osebniZdravnik = tmpZdravnik;
                  }
                  if (tmpZdravnik.tip == 'zobozdravnik') {
                      mojScope.osebniZobozdravnik = tmpZdravnik;
                  }
              }

              /* metoda za krajšanje linkov, če so predolgi */
              $scope.okrajsaj = function (input) {
                  if (input.length > 40) {
                    return input.substring(0, 30) + "...";
                  }
                  return input;
              };
          }
      }


      if( $scope.uporabnik.role.naziv ===  "Pacient"){
          // ce je uporabnik pacient, prikazi enako kot do sedaj
          $scope.izbranPacient = true;
          $scope.omogociIzbiranjePacienta = false;

          $scope.posodobiPacienta( $scope.uporabnik );

      }else{
          // je skor zdravnik
          $scope.omogociIzbiranjePacienta = true;
          $scope.izbranPacient = false;

          /* GET Pacienti tega zdravnika */
          ZdravnikoviPacienti.get({limit:  150}).$promise.then(function(response){
              $scope.mojiPacienti = response.results;
          });
      }

      function clearData(){
          mojScope.uporabnik = "";
          mojScope.bolezni = [];
          mojScope.diete = [];
          mojScope.zdravila = [];
          mojScope.meritve = [];
          mojScope.pregledi = [];
          mojScope.osebniZdravnik = {};
          mojScope.osebniZobozdravnik = {};
      }


  }]);
