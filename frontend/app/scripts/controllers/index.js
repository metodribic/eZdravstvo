'use strict()';

angular.module('tpo')
 .controller('IndexCtrl', ['$scope','$rootScope','Uporabniki','Notification','RegistracijaPacient',function ($scope,$rootScope,Uporabniki,Notification,RegistracijaPacient) {
    $scope.ustvariOskrbovanca = function(){
      var oskrbovanec = new RegistracijaPacient();
      oskrbovanec.oskrbovanec = true;
      var prefix = Math.random() * (100000000 - 100000) + 100000;
      oskrbovanec.email = prefix +'@test.si';
      oskrbovanec.password = 'test1234';
      oskrbovanec.lastnik = $rootScope.uporabnik.id;
      oskrbovanec.$save(function(response){
        Uporabniki.get({iduporabnik: $rootScope.user.id}).$promise.then(function(response){
          Notification.success('Oskrbovanec uspešno ustvarjen!');
          $rootScope.uporabnik = response;
          $rootScope.profili = [$rootScope.user];
          $rootScope.profili = $rootScope.profili.concat(response.oskrbovanci);
          $rootScope.selected = { value: $rootScope.profili[0].ime + " " + $rootScope.profili[0].priimek };
        });
      })
   };
 }]);
