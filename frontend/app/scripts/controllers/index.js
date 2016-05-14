'use strict()';

angular.module('tpo')
 .controller('IndexCtrl', ['$scope','$rootScope','Uporabniki','Notification','RegistracijaPacient',function ($scope,$rootScope,Uporabniki,Notification,RegistracijaPacient) {

    /* ustvari praznega oskrbovanca
        - email in password sta random, ker jih ne potrebujemo
        - lastnik je hkrati tudi kontaktna oseba
    */

    $scope.ustvariOskrbovanca = function(){
      var oskrbovanec = new RegistracijaPacient();
      oskrbovanec.oskrbovanec = true;
      var prefix = Math.random() * (100000000 - 100000) + 100000;
      oskrbovanec.email = prefix +'@test.si';
      oskrbovanec.password = 'test1234';
      oskrbovanec.lastnik = $rootScope.user.id;

      oskrbovanec.$save(function(response){
        // posodobi uporabnika, ker se je dodal nov oskrbovanec
        Uporabniki.get({iduporabnik: $rootScope.user.id}).$promise.then(function(response){
          Notification.success('Oskrbovanec uspešno ustvarjen!');
          $rootScope.uporabnik = response;

          // ui-select 
          $rootScope.profili = [$rootScope.user];
          $rootScope.profili = $rootScope.profili.concat(response.oskrbovanci);
          $rootScope.selected = { value: $rootScope.profili[0].ime + " " + $rootScope.profili[0].priimek };
        });
      });
   };
 }]);
