'use strict()';

/* Contorller za dodajanje pregelda */

angular.module('tpo')
  .controller('DodajPregledCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService','Pregled','Meritve','Bolezni','Zdravila','Diete','ZdravnikoviPacienti',
    function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled, Meritve, Bolezni, Zdravila, Diete, ZdravnikoviPacienti) {
      var naziv = '';
      $scope.uporabnik_je_zdravnik = false;
      console.log($rootScope.uporabnik);

      ZdravnikoviPacienti.query().$promise.then(function(response){
        $scope.pacienti = response;
      });

      // preveri če je prijavljen uporabnik zdravnik
      if($rootScope.uporabnik.tip != 'undefined'){
        $scope.uporabnik_je_zdravnik = true;
        naziv = ', '+$rootScope.uporabnik.naziv;
      }

      // formatiraj string za prikaz trneutnega zdravnika
      $scope.trenutniZdravnik = $rootScope.uporabnik.ime +' '+
                                $rootScope.uporabnik.priimek + naziv;


      // pridobi ustrezen datum
      var datum = new Date();
      $scope.datum = datum.getDay() +'.'+ datum.getMonth() +'.' +datum.getFullYear();
  }]);
